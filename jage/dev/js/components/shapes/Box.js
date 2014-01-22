define (["j.Rectangle", 'j.Vector2'], function (Rectangle, Vector2) {
	var Box = function (properties) {
		if (typeof properties !== "object") {
			properties = {};
		}
		this.start = new Vector2(properties.start);
		this.end = new Vector2(properties.end || {x : 1, y : 1});
	};

	Box.prototype.getProperties = function (gui) {
		var start = gui.addFolder('start');
		this.start.getProperties(start);
		var end = gui.addFolder('end');
		this.end.getProperties(end);
	};
	return Box;
});