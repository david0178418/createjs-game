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
			_systems: {},

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
		};
	}
);