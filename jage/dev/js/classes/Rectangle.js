define(['j.Vector2'], function (Vector2) {
	var Rectangle = function (params) {
		if (typeof params !== "object") {
			params = {};
		}
		this.start = new Vector2(params.start || {x: 0, y: 0});
		this.end = new Vector2(params.end || {x: 1, y: 1});
	};

	return Rectangle;
});