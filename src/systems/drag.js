define([
		'entity-manager',
		'keycodes',
	],
	function(EntityManager, Keycodes) {
	"use strict";

	EntityManager.registerSystem('drag', {
		components: [
			'friction',
			'velocity',
		],
		processOne: function(entity, dt) {
			var velocity = entity.getComponent('velocity'),
				friction = entity.getComponent('friction'),
				lerpRatio = dt/1000;

			if(velocity.get('x')) {
				velocity.set('x', this.applyDrag(velocity.get('x'), friction.get('x') * lerpRatio));
			}

			if(velocity.get('y')) {
				velocity.set('y', this.applyDrag(velocity.get('y'), friction.get('y') * lerpRatio ));
			}
		},

		applyDrag: function(velocity, drag) {
			var directionModifier;

			if(Math.abs(velocity) <= drag) {
				return 0;
			}

			directionModifier = (velocity < 0) ? -1 : 1;

			return velocity - (drag * directionModifier);
		}
	});
});