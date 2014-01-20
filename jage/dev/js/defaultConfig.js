define(['j.RenderingModes'], function (RenderingModes) {
	var defaultConfig = {
		debug: true,
		screen: {
			mainContainer: "#gameContainer",
			renderingMode: RenderingModes.EXTEND,
			width: 600,
			height: 400
		},
		engine: {
			debug: true,
			editing : false
		},
		world: {
			unitSize: 50,
			boundaries: {
				start : {
					x: 0,
					y : 0
				},
				end: {
					x: 12,
					y: 8
				}
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