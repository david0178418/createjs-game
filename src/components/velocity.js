define(['entity-manager'], function(EntityManager) {
	"use strict";

	EntityManager.registerComponent('velocity', function() {
		return {
			properties: {
				maxX: 0,
				maxY: 0,
				x: 0,
				y: 0,
			}
		};
	});
});