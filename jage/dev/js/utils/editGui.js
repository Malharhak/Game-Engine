define(['dat.gui', 'j.propertiesGui', 'jquery'], function (dat, propertiesGui, $) {

	var EditGui = function () {

	};

	EditGui.prototype.init = function () {
		this.main = new dat.GUI({autplace : false});
		var container = $('.j-inspector');
		container.append(this.main.domElement);
		this.config = this.main.addFolder('config');
		this.tools = this.main.addFolder('tools');
		this.propertiesGui = propertiesGui;
	};

	EditGui.prototype.removeFolder = function (gui, name) {
		$(gui.__folders[name].__ul).remove();
		delete gui.__folders[name];
	};

	return new EditGui();

});