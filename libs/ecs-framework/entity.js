define([
		'underscore',
		'component-base'
	],
	function(_, ComponentBase) {
		"use strict";
		return {
			_entityManager: null,
			_id: null,
			_components: {},

			_findComponentWithProperty: function(property) {
				return _(this._components).find(function(component) {
					return component[property] !== undefined;
				});
			},

			_updateComponentsIndexKey: function() {
				this._componentsKey = _.keys(this._components).sort().join('-');
			},

			broadcastComponentUpdates: function() {
				_(this._components).each(function(component, name) {
					var events = component.flushUpdatedProperties();

					if(_(events).isEmpty()) {
						return;
					}

					_(this.getSubscribedComponents()).each(function(component) {
						_(events).each(function(value, event) {
							component.trigger(event, value);
						});
					});

				}, this);
			},

			addComponent: function(name, nonDefaultVals) {
				var newComponent;

				if(this.hasComponent(name)) {
					return;
				}

				nonDefaultVals = nonDefaultVals || {};

				newComponent = this._entityManager.getComponent(name);

				_.defaults(newComponent, {_name: name, _parentEntity: this }, ComponentBase);

				_.extend(newComponent.properties, nonDefaultVals);

				newComponent.init();

				this._components[name] = newComponent;

				this._updateComponentsIndexKey();
				this._entityManager.updateIndex(this);

				return this;
			},

			removeComponent: function(component) {
				delete this._components[component];

				this._updateComponentsIndexKey();

				this._entityManager.updateIndex(this, component);

				return this;
			},

			hasComponent: function() {
				return this._components[name] !== undefined;
			},

			getComponent: function(component) {
				if(component === 'id') {
					return this._id;
				}

				return this._components[component];
			},

			getComponents: function() {
				return _.keys(this._components);
			},

			getSubscribedComponents: function(componentName) {
				return _(this._components).filter(function(component) {
					return component.isSubscribedTo(componentName);
				});
			},

			getComponentsIndexKey: function() {
				return this._componentsKey;
			}
		};
	}
);