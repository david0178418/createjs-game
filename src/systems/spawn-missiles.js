define(['entity-manager'], function(EntityManager) {
	"use strict";
	
	EntityManager.registerSystem('spawn-missles', {
		components: [
			'missile-launcher'
		],
		processOne: function(entity, dt) {
			var lerpRatio = (dt/1000),
				missileLauncher = entity.getComponent('missile-launcher'),
				remainingTime = missileLauncher.get('reloadTime') - dt;
			
			if(remainingTime <= 0) {
				remainingTime = 4000;
				console.log('fire!')
			}

			missileLauncher.set('reloadTime', remainingTime);
		}
	});
});