define([
		'entity-manager'
	],
	function(EntityManager) {
	"use strict";

	return function(spawnX, spawnY) {
		return EntityManager.createEntity()
			.addComponent('missile-launcher');
	};
});