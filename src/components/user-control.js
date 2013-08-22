define([
		'underscore'
	],
	function(_) {
	"use strict";

	return function() {
		return {
			properties: {
				pressedKeys: {},
				pressedMouseButtons: {},
			},

			init: function() {
				_.bindAll(this);

				document.addEventListener("keydown", this.keyDown, false);
				document.addEventListener("keyup", this.keyUp, false);

				document.addEventListener("mousedown", this.mouseDown, false);
				document.addEventListener("mouseup", this.mouseUp, false);
			},

			keyIsPressed: function(keyCode) {
				return !!this.properties.pressedKeys[keyCode];
			},

			keyUp: function(ev) {
				this.properties.pressedKeys[ev.keyCode] = false;
			},

			keyDown: function(ev) {
				this.properties.pressedKeys[ev.keyCode] = true;
			},

			mouseButtonIsPressed: function(mouseButton) {
				return !!this.properties.pressedMouseButtons[mouseButton];
			},

			mouseUp: function(ev) {
				this.properties.pressedMouseButtons[ev.button] = false;
			},

			mouseDown: function(ev) {
				this.properties.pressedMouseButtons[ev.button] = true;
			}
		};
	};
});