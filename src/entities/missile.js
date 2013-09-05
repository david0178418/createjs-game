define([
		'entity-manager'
	],
	function(EntityManager) {
	"use strict";

	return function(spawnX, spawnY) {
		return EntityManager.createEntity()
			.addComponent('position', {
				x: spawnX,
				y: spawnY,
			})
			.addComponent('velocity', {
				maxX: 400,
				maxY: 400,
			})
			.addComponent('circle-graphic', {
				color: 'blue',
				radius: 20,
			});
	};
});