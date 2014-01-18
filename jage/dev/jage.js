requirejs.config ({
	baseUrl: 'js',
	paths: {

		// Entry points
		'j.main' : 'main',
		'j.gameloop' : 'gameloop',
		'j.sceneManager' : 'sceneManager',
		'j.viewport' : 'viewport',
		'j.camera' : 'camera',
		'j.config' : 'config',

		// Main classes
		'j.Scene' : 'Scene',
		'j.Vector2' : 'Vector2',
		'j.Rectangle' : 'Rectangle',
		'j.Point': 'Point',
		'j.GameKey' : 'GameKey',

		// ES classes
		'j.ES': 'ES/ES',
		'j.System' : 'ES/System',
		'j.Entity' : 'ES/Entity',
		'j.Transform': 'ES/Transform',
		'j.systems' : 'ES/systems',
		'j.componentTypes' : 'ES/componentTypes',
		'j.defaultComponents' : 'defaultComponents',
		'j.defaultSystems': 'defaultSystems',
		'j.currentScene' : 'currentScene',
		// Components
		'j.Renderer' : 'components/Renderer',
		'j.Rigidbody' : 'components/Rigidbody',
		'j.Inputable' : 'components/Inputable',

		// Physics shapes
		'j.Circle' : 'components/shapes/Circle',
		'j.Box' : 'components/shapes/Box',

		// Systems
		'j.renderingSystem' : 'systems/renderingSystem',
		'j.physicsSystem' : 'systems/physicsSystem',
		'j.screenSystem' : 'systems/screenSystem',

		// Enums
		'j.GameStates': 'GameStates',
		'j.Shapes' : 'Shapes',
		'j.KeyboardButtons' : 'KeyboardButtons',
		'j.GamepadButtons' : 'GamepadButtons',
		'j.ButtonsMapping' : 'ButtonsMapping',

		// Utils
		'j.requestAnimFrame': 'requestAnimFrame',
		'j.initJage': 'initJage',
		'j.defaultConfig' : 'defaultConfig',
		'j.canvas' : 'canvas',
		'j.world' : 'world',
		'j.emptyScene' : 'defaultScene',
		'j.time' : 'time',
		'j.aabb' : 'aabb',
		'j.units' : 'units',
		'j.rendering' : 'rendering',
		'j.inputs' : 'inputs',
		'j.physics' : 'physics',

		// External libs
		'jquery' : '../libs/jquery',
		'underscore' : '../libs/underscore',
		'dat.gui' : '../libs/dat.gui.min'
	},
	shim : {
		'jquery' : {
			'exports' : '$'
		},
		'underscore' : {
			'exports' : '_'
		},
		'dat.gui': {
			'exports' : 'dat'
		}
	},
	urlArgs: "d=" + Date.now()
});

requirejs(['j.main'], function (main) {
	window.jage = main;
	return main;
});