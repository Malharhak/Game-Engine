requirejs.config ({
	baseUrl: 'js',
	paths: {

		// Entry points
		'j.main' : 'main',
		'j.gameloop' : 'gameloop',
		'j.sceneManager' : 'sceneManager',

		// Main classes
		'j.Scene' : 'Scene',

		// ES classes
		'j.ES': 'ES/ES',
		'j.System' : 'ES/System',
		'j.Entity' : 'ES/Entity',
		'j.systems' : 'ES/systems',
		'j.componentTypes' : 'ES/componentTypes',
		'j.defaultComponents' : 'defaultComponents',
		'j.defaultSystems': 'defaultSystems',

		// Components
		'j.Transform' : 'components/Transform',

		// Enums
		'j.GameStates': 'GameStates',

		// Utils
		'j.requestAnimFrame': 'requestAnimFrame',
		'j.initJage': 'initJage',
		'j.defaultConfig' : 'defaultConfig',
		'j.canvas' : 'canvas',
		// External libs
		'jquery' : '../libs/jquery',
		'underscore' : '../libs/underscore'
	},
	shim : {
		'jquery' : {
			'exports' : '$'
		},
		'underscore' : {
			'exports' : '_'
		}
	},
	urlArgs: "d=" + Date.now()
});

requirejs(['j.main'], function (main) {
	window.jage = main;
	return main;
});