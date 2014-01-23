define(['dat.gui', 'j.propertiesGui', 'jquery'], function (dat, propertiesGui, $) {

	var gui = new dat.GUI({autplace : false});
	var container = $('.j-inspector');
	container.append(gui.domElement);
	gui.addFolder('config');
	gui.addFolder('tools');

	function removeFolder (gui, name) {
		$(gui.__folders[name].__ul).remove();
		delete gui.__folders[name];
	}

	return {
		main : gui,
		config : gui.__folders.config,
		propertiesGui : propertiesGui,
		tools : gui.__folders.tools,
		removeFolder : removeFolder
	};

});