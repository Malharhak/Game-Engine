define([], function () {
	var defaultConfig = {
		screen: {
			mainContainer: "#gameContainer",
			renderingMode: 'fixedResolution',
			width: 600,
			height: 400
		},
		engine: {
			debug: true
		},
		world: {
			unitSize: {
				x: 100,
				y: 100
			},
			boundaries: {
				x: 5,
				y: 5
			}
		},
		camera: {
			distance: 1
		}
	};

	return defaultConfig;
});