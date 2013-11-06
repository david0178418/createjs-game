define(function(require) {
		'use strict';
		
		var _ = require('underscore'),
			createjs = require('createjs'),
			EntityManager = require('entity-manager'),
			Stage = require('stage'),

			//Entities
			missileSpawnerFactory = require('entities/missile-spawner'),
			playerFactory = require('entities/player');

		//Component)s
		require('components/acceleration'),
		require('components/circle-graphic'),
		require('components/dash-charge'),
		require('components/friction'),
		require('components/missle-launcher'),
		require('components/position'),
		require('components/user-control'),
		require('components/velocity'),

		//Systems
		require('systems/accelerate'),
		require('systems/dash-charge'),
		require('systems/drag'),
		require('systems/move'),
		require('systems/spawn-missiles'),
		require('systems/user-movement');

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