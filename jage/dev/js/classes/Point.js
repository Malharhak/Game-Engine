define([], function () {
	var Point = function (params) {
		if (typeof params !== "object") {
			params = {};
		}
		this.x = (params.x || 0) | 0;
		this.y = (params.y || 0) | 0;
	};

	return Point;
});