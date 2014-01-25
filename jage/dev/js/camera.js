define(['j.world', 'j.Rectangle', 'j.aabb', 'j.Vector2', 'j.canvas'],
 function (world, Rectangle, aabb, Vector2, canvas) {
	var Camera = function () {
		this.position = new Vector2(0, 0);
		this.box = new Rectangle ({
			start: {
				x : -8,
				y : -4.5
			},
			end: {
				x: 16,
				y: 9
			},
			width : 1600,
			height : 900
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
	Camera.prototype.convertLocalPosition = function (position) {
		return new Vector2({
			x : position.x + this.box.start.x,
			y : position.y + this.box.start.y
		});
	};

	Camera.prototype.load = function (properties) {
		if (typeof properties === "object") {
			this.setPosition (properties.position);
		}
	};

	Camera.prototype.setPosition = function (position) {
		this.position = new Vector2(position);
		this.resizeCallback(this.width, this.height);
	};
	Camera.prototype.resizeCallback = function (width, height) {
		this.width = width;
		this.height = height;
		console.log(width, height);
		this.box.start.x = this.position.x -(width / world.unitSize) / 2;
		this.box.start.y = this.position.y -(height / world.unitSize) / 2;
		this.box.end.x = width / world.unitSize;
		this.box.end.y = height / world.unitSize;
	};
	Camera.prototype.init = function (options) {
		this.position = new Vector2(options.position);
		this.distance = options.distance;
		var self = this;
		canvas.setResizeCallback (function (width, height) {
			self.resizeCallback(width, height);
		});
	};

	return new Camera();
});