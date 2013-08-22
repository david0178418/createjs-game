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

			_getComponentsIndexes: function(components) {
				var indexKeys = _.keys(this._componentIndexes);
				components.sort();

				return _.select(indexKeys, function(key) {
					var keyComponents = key.split('-');

					return !(_.difference(components, keyComponents).length);
				});
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
				return _.select(this._entities, function(entity) {
					return !(_.difference(components, entity.getComponents()).length);
				});
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

			createIndex: function(components) {
				var indexKey = this._components.sort().join('-');

				if(this._componentIndexes[indexKey]) {
					return;
				}

				this._componentIndexes[indexKey] = this.getEntities(components);
			},

			updateIndex: function(entity, removedComponent) {
				//var indexes = this._getComponentIndexes(component);
				var components = entity.getComponents();

				if(removedComponent) {
					components.push(removedComponent);
				}
			}
		};
	}
);