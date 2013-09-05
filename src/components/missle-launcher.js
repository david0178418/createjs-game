define(['entity-manager'], function(EntityManager) {
	"use strict";

	EntityManager.registerComponent('missile-launcher', function() {
		return {
			properties: {
				power: 20,
				rate: 3000,
				reloadTime: 4000,
			}
		};
	});
});