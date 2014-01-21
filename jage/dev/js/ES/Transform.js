define(['j.Vector2'], function (Vector2) {
	var Transform = function (params) {
		this.position = new Vector2(params.position);
		this.angle = params.angle || 0;
		this.parent = params.parent || -1;
	};

	return Transform;
});