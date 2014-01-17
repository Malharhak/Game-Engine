define (['j.componentTypes', 'j.systems', 'j.defaultComponents', 'j.defaultSystems',
 'j.defaultConfig', 'underscore', 'j.canvas', 'j.emptyScene', 'j.sceneManager',
 'j.viewport', 'j.camera', 'j.world', 'j.config'],
 function (componentTypes, systems, defaultComponents, defaultSystems,
  defaultConfig, _, canvas, emptyScene, sceneManager,
  viewport, camera, world, config) {


	config.init(defaultConfig);
	function initJage(options, callback) {
		sceneManager.registerScene('empty', emptyScene);
		config.init(options);
		for (var c in defaultComponents) {
			componentTypes.registerComponent(c, defaultComponents[c]);
		}
		for (var s in defaultSystems) {
			systems.registerSystem (s, defaultSystems[s]);
		}
		world.init(config.world);
		canvas.init (config.screen);
		viewport.init (config.screen);
		camera.init(config.camera);
		sceneManager.loadScene('empty', function () {
			if (typeof callback === "function") {
				callback();
			}
		});
	}

	return initJage;
});