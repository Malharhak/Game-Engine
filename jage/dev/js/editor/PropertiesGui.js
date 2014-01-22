define (['jquery', 'dat.gui'], function ($, dat)  {
	var PropertiesGui = function (params) {
		this.container = $('<div />').addClass('j-properties-editor').appendTo($('body'));
		this.gui = new dat.GUI({autoplace : false});
		this.container.append($(this.gui.domElement));

		//this.fillProperties(params.entity);
	};

	PropertiesGui.prototype.destroy = function () {
		this.gui.destroy();
		this.container.remove();
	};

	PropertiesGui.prototype.fillProperties = function (item, folder) {
		if (typeof folder === "undefined") {
			folder = this.gui;
		}
		for (var i in item) {
			var prop = item[i];
			if (typeof prop === "undefined" || typeof prop === "function") {
				continue;
			}
			if (typeof prop === "object") {
				var newFolder = folder.addFolder(i);
				this.fillProperties(prop, newFolder);
			} else {
				folder.add(item, i);
			}
		}
	};

	return PropertiesGui;
});