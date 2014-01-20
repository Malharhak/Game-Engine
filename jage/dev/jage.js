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
		'j.canvas' : 'canvas',
		'j.world' : 'world',
		'j.time' : 'time',
		'j.units' : 'units',
		'j.inputs' : 'inputs',
		'j.mouse' : 'mouse',

		// Main classes
		'j.Scene' : 'classes/Scene',
		'j.Vector2' : 'classes/Vector2',
		'j.Rectangle' : 'classes/Rectangle',
		'j.Point': 'classes/Point',
		'j.GameKey' : 'classes/GameKey',

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
		'j.mouseSystem' : 'systems/mouseSystem',

		// Enums
		'j.GameStates': 'enums/GameStates',
		'j.Shapes' : 'enums/Shapes',
		'j.KeyboardButtons' : 'enums/KeyboardButtons',
		'j.GamepadButtons' : 'enums/GamepadButtons',
		'j.ButtonsMapping' : 'enums/ButtonsMapping',
		'j.RenderingModes' : 'enums/RenderingModes',
		'j.MouseButtons' : 'enums/MouseButtons',

		// Others
		'j.initJage': 'initJage',
		'j.defaultConfig' : 'defaultConfig',
		'j.emptyScene' : 'defaultScene',
		'j.MouseButton' : 'MouseButton',

		// Utils
		'j.requestAnimFrame': 'utils/requestAnimFrame',
		'j.pageVisibility' : 'utils/pageVisibility',

		// Rendering
		'j.rendering' : 'rendering/rendering',

		// Physics
		'j.aabb' : 'physics/aabb',
		'j.circlecircle' : 'physics/circlecircle',
		'j.physics' : 'physics/physics',
		'j.Collision' : 'physics/Collision',

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