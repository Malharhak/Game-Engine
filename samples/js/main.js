	requirejs.config( {
		baseUrl : 'js',
		paths: {
			'jage' : '../../jage/jage.build'
		},
		shim: {
			'jage': {
				exports: 'jage'
			}
		},
		urlArgs: "d=" + Date.now()
	});
	// First we load the built file containing the defines, then we can load jage
	requirejs(['jage'], function ()  {
		require(['j.main', 'j.test'], function (jage, test) {
			console.log("loaded jage");
			console.log(jage);
			test.x++;
			console.log(test);
		});
	});