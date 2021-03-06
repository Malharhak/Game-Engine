	requirejs.config( {
		baseUrl : 'js',
		paths: {
			'jage' : '../../jage/jage.build',
			'chai' : '../bower_components/chai/chai'
		},
		shim: {
			'jage': {
				exports: 'jage'
			}
		},
		urlArgs: "d=" + Date.now()
	});
	// loading mocha
	require(['jage'], function () {
		require(['tests'], function () {
			if (window.mochaPhantomJS) {mochaPhantomJS.run();}
			else {mocha.run();}
		});
	});