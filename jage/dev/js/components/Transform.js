define([], function () {
	var Transform = function (x, y, parent) {
		this.x = x;
		this.y = y;
		this.angle = 0;
		this.parent = parent;
	};

	return Transform;
});