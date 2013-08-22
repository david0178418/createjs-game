define(function() {
	"use strict";

	return {
		components: [
			'velocity',
			'acceleration',
		],
		processOne: function(entity, dt) {
			var lerpRatio = (dt/1000),
				velocity = entity.getComponent('velocity'),
				acceleration = entity.getComponent('acceleration');

			if(acceleration.get('x') && Math.abs(velocity.get('x')) < velocity.get('maxX')) {
				velocity.set('x', this.applyAcceleration(velocity.get('x'), velocity.get('maxX'), acceleration.get('x') * lerpRatio ));
			}

			if(acceleration.get('y') && Math.abs(velocity.get('y')) < velocity.get('maxY')) {
				velocity.set('y', this.applyAcceleration(velocity.get('y'), velocity.get('maxY'), acceleration.get('y') * lerpRatio ));
			}
		},

		applyAcceleration: function(velocity, maxVelocity, acceleration) {
			var veloctiyDirectionModifier = (velocity < 0 ) ? -1 : 1;
			
			if(Math.abs(velocity + acceleration) >= maxVelocity) {
				return maxVelocity * veloctiyDirectionModifier;
			}

			return velocity + acceleration;
		}
	};
});