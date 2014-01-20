define ([], function () {
	var Collision = function (body1, body2) {
		this.rigidbody = body1;
		this.collided = body2;
	};

	return Collision;
});