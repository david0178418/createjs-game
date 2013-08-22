define([
		'keycodes'
	],
	function(Keycodes) {
	"use strict";

	return {
		components: [
			'hero-graphic',
			'user-control',
			'acceleration',
		],
		processOne: function(entity, dt) {
			var acceleration = entity.getComponent('acceleration'),
				keyboardControl = entity.getComponent('user-control'),
				accelerationRate = acceleration.get('accelerationRate');

			if(keyboardControl.keyIsPressed(Keycodes.W)) {
				acceleration.set('y', (-1) * accelerationRate);
			} else if(keyboardControl.keyIsPressed(Keycodes.S)) {
				acceleration.set('y', accelerationRate);
			} else {
				acceleration.set('y', 0);
			}

			if(keyboardControl.keyIsPressed(Keycodes.A)) {
				acceleration.set('x', (-1) * accelerationRate);
			} else if(keyboardControl.keyIsPressed(Keycodes.D)) {
				acceleration.set('x', accelerationRate);
			} else {
				acceleration.set('x', 0);
			}
		}
	};
});