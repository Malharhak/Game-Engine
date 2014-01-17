define (["j.Rectangle"], function (Rectangle) {
	var BoxCollider = function (properties) {
		this.box = new Rectangle(properties);
	};

	return BoxCollider;
});