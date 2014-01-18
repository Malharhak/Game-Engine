define(['j.Vector2'], function (Vector2) {
	var Circle = function (properties) {
		if (typeof properties !== "object") {
			properties = {};
		}
		this.radius = properties.radius || 1;
		this.center = new Vector2(properties.center);
	};

	return Circle;
});