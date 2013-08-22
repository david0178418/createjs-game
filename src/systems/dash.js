define([
		'keycodes'
	],
	function(Keycodes) {
	"use strict";

	return {
		components: [
			'keyboard-control',
			'hero-graphic',
			'velocity',
		],
		processOne: function(entity, dt) {
			var velocity = entity.getComponent('velocity'),
				keyboardControl = entity.getComponent('keyboard-control');

			if(Math.abs(velocity.get('x')) <= velocity.get('maxX')) {

				if(keyboardControl.keyIsPressed(Keycodes.J)) {
					velocity.set('x', -800);
				}

				if(keyboardControl.keyIsPressed(Keycodes.L)) {
					velocity.set('x', 800);
				}
			}

			if(Math.abs(velocity.get('y')) <= velocity.get('maxY')) {

				if(keyboardControl.keyIsPressed(Keycodes.I)) {
					velocity.set('y', -800);
				}

				if(keyboardControl.keyIsPressed(Keycodes.K)) {
					velocity.set('y', 800);
				}
			}
		}
	};
});