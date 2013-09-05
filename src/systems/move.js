define(['entity-manager'], function(EntityManager) {
	"use strict";

	EntityManager.registerSystem('move', {
		components: [
			'position',
			'velocity'
		],
		processOne: function(entity, dt) {
			var lerpRatio = (dt/1000),
				position = entity.getComponent('position'),
				velocity = entity.getComponent('velocity');

			position.set('x', position.get('x') + (lerpRatio * velocity.get('x')));
			position.set('y', position.get('y') + (lerpRatio * velocity.get('y')));
		}
	});
});