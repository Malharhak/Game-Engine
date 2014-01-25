define (['j.world', 'j.Point', 'j.Vector2', 'j.canvas'],
 function (world, Point, Vector2, canvas) {
	var Viewport = function () {
	};

	Viewport.prototype.init = function (options) {
		this.width = options.width;
		this.height = options.height;
	};

	Viewport.prototype.convertPosition = function (position) {
		return new Point({
			x: position.x * world.unitSize,
			y : (canvas.height) - (position.y * world.unitSize)
		});
	};
	Viewport.prototype.convertScreenPosition = function (point) {
		return new Vector2( {
			x : point.x / world.unitSize,
			y : Math.abs((point.y - canvas.height) / world.unitSize)
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