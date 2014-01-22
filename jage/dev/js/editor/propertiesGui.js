define(['j.PropertiesGui'], function (PropertiesGui) {
	var propertiesGui = function () {
		this.gui = false;
	};

	propertiesGui.prototype.create = function (params) {
		if (typeof this.gui === "object") {
			console.log("removing");
			$(this.gui.container).remove();
			delete this.gui;
			this.gui = false;
		}
		if (params.entity !== false) {
			this.gui = new PropertiesGui(params);
		}
		return this.gui;
	};

	return new propertiesGui();
});