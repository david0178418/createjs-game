define([
		'createjs',
		'keycodes',
		'stage',
	],
	function(createjs, Keycodes, Stage) {
	"use strict";

	return {
		components: [
			'hero-graphic',
			'position',
			'velocity',
			'acceleration',
			'dash-charge',
			'user-control',
		],
		processOne: function(entity, dt) {
			var lerpRatio = dt/1000,
				userControl = entity.getComponent('user-control'),
				dashCharge = entity.getComponent('dash-charge');

			if(!userControl.mouseButtonIsPressed(0)) {
				if(!dashCharge.get('power')) {
					return;
				}

				entity.removeComponent('user-control');

				entity.getComponent('velocity').set('x', 0).set('y', 0);
				entity.getComponent('acceleration').set('x', 0).set('y', 0);

				this.startDash(entity);
			}

			dashCharge.set('power', dashCharge.get('powerRate') * lerpRatio);
		},

		startDash: function(entity) {
			createjs.TweenJS
				.get(entity.getComponent('position'))
				.to({
					x: Stage.mouseX,
					y: Stage.mouseY,
				}, 300)
				.call(this.finishDash, [entity, Stage.mouseX, Stage.mouseY], this);
			entity.getComponent('dashCharge').set('power', 0);
		},

		finishDash: function(entity) {
			entity.addComponent('user-control');
		}
	};
});