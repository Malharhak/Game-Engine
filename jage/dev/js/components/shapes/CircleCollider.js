define(['j.Vector2'], function (Vector2) {
	var CircleCollider = function (properties) {
		this.radius = properties.radius || 1;
		this.center = new Vector2(properties.center);
	};

	return CircleCollider;
});