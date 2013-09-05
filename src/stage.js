define([
		'createjs',
		'config'
	],
	function(
		createjs,
		config
	) {
		'use strict';
		var stage = new createjs.Stage(config.stageCanvas);

		stage.canvas.width = config.stageWidth;
		stage.canvas.height = config.stageHeight;
		stage.canvas.style.backgroundColor = config.stageColor;

		if(config.debug) {
			window.stage = stage;
		}

		return stage;
	}
);