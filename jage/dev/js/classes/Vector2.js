define ([], function () {
	var Vector2 = function (params, y) {
		if (typeof params === "object") {
			this.x = params.x || 0;
			this.y = params.y || 0;
		} else {
			this.x = params || 0;
			this.y = y || 0;
		}
	};

	Vector2.prototype.add = function (other) {
		return new Vector2(this.x + other.x, this.y + other.y);
	};

	Vector2.prototype.sub = function (other) {
		return new Vector2(this.x - other.x, this.y - other.y);
	};

	Vector2.prototype.scale = function (scalar) {
		return new Vector2(this.x * scalar, this.y * scalar);
	};

	Vector2.prototype.length = function () {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};

	Vector2.prototype.normalize = function () {
		var ln = this.length();
		return new Vector2(this.x / ln, this.y / ln);
	};

	Vector2.prototype.getProperties = function (gui) {
		var self = this;
		gui.add(self, 'x');
		gui.add(self, 'y');
	};
	return Vector2;
});