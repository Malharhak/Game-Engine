define (['j.componentTypes', 'j.systems', 'j.defaultComponents', 'j.defaultSystems',
 'j.defaultConfig', 'underscore', 'j.canvas'],
 function (componentTypes, systems, defaultComponents, defaultSystems,
  defaultConfig, _, canvas) {

	var config = defaultConfig;
	function initJage(options) {
		config = _.extend(defaultConfig, options);
		for (var c in defaultComponents) {
			componentTypes.registerComponent(c, defaultComponents[c]);
		}
		for (var s in defaultSystems) {
			systems.registerSystem (s, defaultSystems[s]);
		}
		canvas.init (config.screen);
	}

	return initJage;
});