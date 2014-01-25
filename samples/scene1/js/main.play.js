	requirejs.config( {
		baseUrl : 'js',
		paths : {
			'jage' : '../../../jage/jage.build'
		},
		shim : {
			'jage' : {
				exports : 'jage'
			}
		},
		urlArgs: "d=" + Date.now()
	});
	// loading mocha
	require(['jage'], function () {
		require(['play'], function () {
		});
	});