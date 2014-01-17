define([], function () {
	var Point = function (params) {
		this.x = (params.x || 0) | 0;
		this.y = (params.y || 0) | 0;
	};

	return Point;
});