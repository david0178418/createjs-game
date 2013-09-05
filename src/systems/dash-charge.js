define([
		'entity-manager',
		'createjs',
		'keycodes',
		'stage',
	],
	function(EntityManager, createjs, Keycodes, Stage) {
	"use strict";

	EntityManager.registerSystem('dash-charge', {
		components: [
			'circle-graphic',
			'position',
			'velocity',
			'acceleration',
			'dash-charge',
			'user-control',
		],
		processOne: function(entity, dt) {
			var time,
				xDist,
				yDist,
				lerpRatio = dt/1000,
				userControl = entity.getComponent('user-control'),
				dashCharge = entity.getComponent('dash-charge'),
				power = dashCharge.get('power');

			if(!userControl.mouseButtonIsPressed(0)) {
				if(!power) {
					return;
				}

				entity.removeComponent('user-control');

				entity.getComponent('velocity').set('x', 0).set('y', 0);
				entity.getComponent('acceleration').set('x', 0).set('y', 0);

				xDist = Stage.mouseX - entity.getComponent('position').get('x');
				yDist = Stage.mouseY - entity.getComponent('position').get('y');

				time = Math.sqrt(xDist*xDist + yDist*yDist) / 7;

				console.log(time);

				this.startDash(entity, time);
			} else {
				if(!power) {
					power = dashCharge.get('minPower');
				} else if(power < dashCharge.get('maxPower')) {
					power = power + dashCharge.get('powerRate') * lerpRatio;

					if(power > dashCharge.get('maxPower')) {
						power = dashCharge.get('maxPower');
					}
				}

				dashCharge.set('power', power);
			}
		},

		startDash: function(entity, time) {
			createjs.Tween
				.get(entity.getComponent('position'))
				.to({
					x: Stage.mouseX,
					y: Stage.mouseY,
				}, time)
				.call(this.finishDash, [entity, Stage.mouseX, Stage.mouseY], this);
			entity.getComponent('dash-charge').set('power', 0);
		},

		finishDash: function(entity) {
			entity.addComponent('user-control');
		}
	});
});