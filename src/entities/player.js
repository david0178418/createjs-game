define([
		'entity-manager'
	],
	function(EntityManager) {
	"use strict";

	return function() {
		return EntityManager.createEntity()
			.addComponent('user-control')
			.addComponent('dash-charge')
			.addComponent('position')
			.addComponent('friction', {
				x: 450,
				y: 450,
			})
			.addComponent('velocity', {
				maxX: 400,
				maxY: 400,
			})
			.addComponent('acceleration', {
				accelerationRate: 1500,
			})
			.addComponent('hero-graphic', {
				color: 'blue',
				radius: 20,
			});
	};
});