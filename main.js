requirejs.config({
	urlArgs: "bust=" +  (new Date()).getTime(),
	baseUrl: 'src',
	paths: {
		'config': '../config',
		'underscore': '../libs/lodash-1.3.1.min',
		'createjs': '../libs/createjs-2013.05.14.min',
		//Entity-Component-System Framework
		'entity-manager': '../libs/ecs-framework/entity-manager',
		'entity': '../libs/ecs-framework/entity',
		'component-base': '../libs/ecs-framework/component-base',
		'system-base': '../libs/ecs-framework/system-base',
	},
	shim: {
		'underscore': {
			exports: '_'
		},
		'createjs': {
			exports: 'createjs'
		}
	}
});

require(
	['game', 'config'],
	function(Game, Config) {
		Game.init(Config);
	}
);