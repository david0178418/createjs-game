define([
		'underscore',
		'entity',
		'system-base'
	],
	function(_, Entity, SystemBase) {
		"use strict";

		return {
			_entities: {},
			_components: {},
			_nextEntityId: 1,
			_componentIndexes: {},
			_systems: {},

			_getIndexKey: function(components) {
				return components.sort().join('-')
			},

			registerComponent: function(name, factory) {
				if(this._components[name]) {
					return;
				}

				this._components[name] = factory;

				return this;
			},

			unregisterComponent: function(name) {
				delete this._components[name];

				return this;
			},

			getComponent: function(name) {
				var componentFactory = this._components[name];
				if(componentFactory) {
					return componentFactory();
				} else {
					return false;
				}
			},

			registerSystem: function(name, system) {
				this._systems[name] = _.extend(system, SystemBase);
				
				return this;
			},

			unregisterSystem: function(name, type) {
				delete this._systems[name];
			},

			runSystems: function(dt, stage) {
				_(this._systems).each(function(system) {
					var entities = this.getEntities(system.components);
					system.run(entities, dt);
				}, this);

				return this;
			},

			getEntities: function(components) {
				var indexKey = this._getIndexKey(components);

				if(this._componentIndexes[indexKey]) {
					return this._componentIndexes[indexKey];
				}

				this.createIndex(indexKey);

				return this._componentIndexes[indexKey];
			},

			createEntity: function() {
				var newEntity = _.merge({}, Entity, {_entityManager: this, _id: this._nextEntityId});

				this._entities[this._nextEntityId] = newEntity;

				this._nextEntityId = this. _nextEntityId + 1;

				return newEntity;
			},

			destroyEntity: function(entity) {
				var entityId = _.isObject(entity) ?  entity.get('id') : entityId;

				delete this._entities[entityId];

				return this;
			},

			createIndex: function(indexKey) {
				if(this._componentIndexes[indexKey]) {
					return;
				}

				var components = indexKey.split["-"];

				this._componentIndexes[indexKey] = _.select(this._entities, function(entity) {
					return !(_.difference(components, entity.getComponents()).length);
				});

				return this._componentIndexes[indexKey];
			},

			updateIndex: function(entity, removedComponent) {
				var indexes,
					updateKey,
					components = entity.getComponents();

				if(removedComponent) {
					components.push(removedComponent);
					updateKey = this._components.sort().join('-');

					this._componentIndexes[updateKey] = this.getEntities(components);
				}

				this.createIndex(entity.getComponentsIndexKey());
			},
		};
	}
);