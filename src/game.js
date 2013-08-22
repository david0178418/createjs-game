define([
		'underscore',
		'createjs',
		'entity-manager',
		'stage',
		//Components
		'components/hero-graphic',
		'components/position',
		'components/velocity',
		'components/acceleration',
		'components/friction',
		'components/dash-charge',
		'components/user-control',
		//Systems
		'systems/drag',
		'systems/accelerate',
		'systems/move',
		'systems/user-movement',
		'systems/dash-charge',
		//Entities
		'entities/player',
	],
	function(
		_,
		createjs,
		EntityManager,
		Stage,
		//Components
		HeroGraphic,
		Position,
		Velocity,
		Acceleration,
		Friction,
		DashCharge,
		UserControl,
		//Systems
		DragSys,
		AccelerateSys,
		MoveSys,
		UserMovementSys,
		DashChargeSys,
		//Entities
		playerFactory
	) {
		"use strict";

		return {
			init: function(config) {
				this.entityManager = EntityManager;

				this.stage = Stage;

				createjs.Ticker.setFPS(config.fps);
				createjs.Ticker.addEventListener("tick", _.bind(this.update, this));
window.entityManager = this.entityManager;
				this.entityManager
					.registerComponent("hero-graphic", HeroGraphic)
					.registerComponent("position", Position)
					.registerComponent("velocity", Velocity)
					.registerComponent("acceleration", Acceleration)
					.registerComponent("friction", Friction)
					.registerComponent("dash-charge", DashCharge)
					.registerComponent("user-control", UserControl)
					.registerSystem("user-movement",  UserMovementSys)
					//.registerSystem("dash",  DashSys)
					.registerSystem('dash-charge', DashChargeSys)
					.registerSystem("accelerate",  AccelerateSys)
					.registerSystem("drag",  DragSys)
					.registerSystem("move",  MoveSys);

				window.player = playerFactory();
			},

			update: function(event) {
				var dt = event.delta;

				this.entityManager.runSystems(dt, this.stage);
				this.stage.update();
			}
		};
	}
);