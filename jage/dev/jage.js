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
		'j.Component': 'ES/Component',

		// Enums
		'j.GameStates': 'GameStates',


		// External libs
		'jquery' : '../libs/jquery',
		'underscore' : '../libs/underscore',
		'j.test' : 'test'
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

requirejs(['j.main', 'j.test'], function (main, test) {
	window.jage = main;
	console.log(main);
	test.x++;
	return main;
});