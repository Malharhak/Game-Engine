define([], function () {
	var Transform = function (params) {
		this.x = params.x || 0;
		this.y = params.y || 0;
		this.angle = params.angle || 0;
		this.parent = params.parent || 0;
	};

	return Transform;
});