define(['j.world', 'j.Rectangle', 'j.aabb', 'j.Vector2'],
 function (world, Rectangle, aabb, Vector2) {
	var Camera = function () {
		this.box = new Rectangle ({
			start: {
				x : 0,
				y : 0
			},
			end: {
				x: 16,
				y: 9
			}
		});
		this.distance = 1;
	};

	Camera.prototype.isInside = function (box) {
		return aabb(this.box, box);
	};
	Camera.prototype.convertPosition = function (position) {
		return new Vector2({
			x: position.x - this.box.start.x,
			y : position.y - this.box.start.y
		});
	};

	Camera.prototype.init = function (options) {
		this.box.start.x = options.x;
		this.box.start.y = options.y;
		this.distance = options.distance;
		this.box.end.x = options.width;
		this.box.end.y = options.height;
	};

	return new Camera();
});