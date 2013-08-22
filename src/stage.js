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

		if(config.debug) {
			window.stage = stage;
		}

		return stage;
	}
);