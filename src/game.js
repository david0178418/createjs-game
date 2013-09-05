define([
		'underscore',
		'createjs',
		'entity-manager',
		'stage',
		//Entities
		'entities/missile-spawner',
		'entities/player',
		//Components
		'components/acceleration',
		'components/circle-graphic',
		'components/dash-charge',
		'components/friction',
		'components/missle-launcher',
		'components/position',
		'components/user-control',
		'components/velocity',
		//Systems
		'systems/accelerate',
		'systems/dash-charge',
		'systems/drag',
		'systems/move',
		'systems/spawn-missiles',
		'systems/user-movement',
	],
	function(
		_,
		createjs,
		EntityManager,
		Stage,
		missileSpawnerFactory,
		playerFactory
	) {
		"use strict";

		return {
			init: function(config) {
				this.entityManager = EntityManager;

				this.stage = Stage;

				createjs.Ticker.setFPS(config.fps);
				createjs.Ticker.addEventListener('tick', _.bind(this.update, this));

				window.player = playerFactory();
				window.missleLauncher = missileSpawnerFactory();
			},

			update: function(event) {
				var dt = event.delta;

				this.entityManager.runSystems(dt, this.stage);
				this.stage.update();
			}
		};
	}
);