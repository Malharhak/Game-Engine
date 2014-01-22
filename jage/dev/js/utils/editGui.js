define(['dat.gui', 'j.propertiesGui', 'jquery'], function (dat, propertiesGui, $) {

	var gui = new dat.GUI();
	gui.addFolder('config');

	function removeFolder (gui, name) {
		$(gui.__folders[name].__ul).remove();
		delete gui.__folders[name];
	}

	return {
		main : gui,
		config : gui.__folders.config,
		propertiesGui : propertiesGui,
		removeFolder : removeFolder
	};

});