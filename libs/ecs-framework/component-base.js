define([
	],
	function(EntityManager) {
		"use strict";

		return {
			_updatedProperties: {
			},

			_listensTo: [],

			eventHandlers: {},

			init: function() {
			},

			_trackUpdate: function(property, value) {
				this._updatedProperties[this._name+'.'+property] = value;
			},

			flushUpdatedProperties: function() {
				var updatedAttributes = this._updatedProperties;
				this._updatedProperties = {};

				return updatedAttributes;
			},

			trigger: function(event, value) {
				if(!this.eventHandlers[event]) {
					return;
				}

				this.eventHandlers[event].call(this, value);
			},

			isSubscribedTo: function(componentName) {
				var name = this._name === componentName ? 'self': componentName;
				return this._listensTo.indexOf(componentName);
			},

			get: function(property) {
				return this.properties[property];
			},

			set: function(property, newValue) {
				if(newValue === this.properties[property]) {
					return this;
				}

				this.properties[property] = newValue;

				this._trackUpdate(property, newValue);

				return this;
			}
		};
	}
);