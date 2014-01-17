define (['j.world', 'j.Point'], function (world, Point) {
	var Viewport = function () {
	};

	Viewport.prototype.init = function (options) {
		this.width = options.width;
		this.height = options.height;
	};

	Viewport.prototype.convertPosition = function (position) {
		return new Point({
			x: position.x * world.unitSize,
			y : (this.height) - (position.y * world.unitSize)
		});
	};

	Viewport.prototype.convertPoint = function (position ) {
		return new Point({
			x: position.x * world.unitSize,
			y : position.y * world.unitSize
		});
	};
	Viewport.prototype.convertUnit = function (value) {
		return value * world.unitSize;
	};
	return new Viewport();
});