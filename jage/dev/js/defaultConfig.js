define([], function () {
	var defaultConfig = {
		debug: true,
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
			unitSize: 50,
			boundaries: {
				x: 30,
				y: 5
			}
		},
		camera: {
			distance: 1,
			width: 12,
			height: 8,
			x: 0,
			y: 0
		}
	};

	return defaultConfig;
});