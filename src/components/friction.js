define(['entity-manager'], function(EntityManager) {
	"use strict";

	EntityManager.registerComponent('friction', function() {
		return {
			properties: {
				x: 5,
				y: 5,
			}
		};
	});
});