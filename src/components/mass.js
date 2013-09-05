define(['entity-manager'], function(EntityManager) {
	"use strict";

	EntityManager.registerComponent('mass', function() {
		return {
			properties: {
				units: 100
			},
		};
	});
});