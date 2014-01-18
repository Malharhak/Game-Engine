define (["j.Rectangle"], function (Rectangle) {
	var Box = function (properties) {
		this.box = new Rectangle(properties);
	};

	return Box;
});