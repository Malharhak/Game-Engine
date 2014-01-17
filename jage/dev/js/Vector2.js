define ([], function () {
	var Vector2 = function (params) {
		this.x = params.x || 0;
		this.y = params.y || 0;
	};

	return Vector2;
});