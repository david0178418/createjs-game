define(['entity-manager'], function(EntityManager) {
	"use strict";

	EntityManager.registerComponent('dash-charge', function() {
		return {
			properties: {
				maxPower: 800,
				minPower: 300,
				powerRate: 200,
				power: 0,
			}
		};
	});
});