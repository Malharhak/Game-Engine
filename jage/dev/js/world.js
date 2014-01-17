define (["underscore"], function (_) {
	var World = function () {
		this.gravity = 0;
	};

	World.prototype.init = function (options) {
		this.options = options;
		this.unitSize = options.unitSize;
		this.boundaries = options.boundaries;
	};

	World.prototype.setProperties = function (properties) {
		_.extend(this, properties);
	};

	return new World();
});