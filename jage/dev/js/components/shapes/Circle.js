define(['j.Vector2'], function (Vector2) {
	var Circle = function (properties) {
		if (typeof properties !== "object") {
			properties = {};
		}
		this.radius = properties.radius || 1;
		this.center = new Vector2(properties.center);
	};

	Circle.prototype.getProperties = function (gui) {
		var center = gui.addFolder('center');
		this.center.getProperties(center);
		gui.add(this, 'radius');
	};

	return Circle;
});