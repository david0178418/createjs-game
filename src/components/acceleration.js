define(['entity-manager'], function(EntityManager) {
	'use strict';

	EntityManager.registerComponent('acceleration', function() {
		return {
			properties: {
				accelerationRate: 0,
				drag: 0,
				x: 0,
				y: 0,
			},
		};
	});
});