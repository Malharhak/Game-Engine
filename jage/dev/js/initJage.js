define (['j.componentTypes', 'j.systems', 'j.defaultComponents', 'j.defaultSystems',
 'j.defaultConfig', 'underscore', 'j.canvas', 'j.emptyScene', 'j.sceneManager'],
 function (componentTypes, systems, defaultComponents, defaultSystems,
  defaultConfig, _, canvas, emptyScene, sceneManager) {


	var config = defaultConfig;
	function initJage(options, callback) {
		sceneManager.registerScene('empty', emptyScene);
		config = _.extend(defaultConfig, options);
		for (var c in defaultComponents) {
			componentTypes.registerComponent(c, defaultComponents[c]);
		}
		for (var s in defaultSystems) {
			systems.registerSystem (s, defaultSystems[s]);
		}
		canvas.init (config.screen);
		sceneManager.loadScene('empty', function () {
			if (typeof callback === "function") {
				callback();
			}
		});
	}

	return initJage;
});