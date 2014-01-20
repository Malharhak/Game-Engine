define ([], function () {
	var MouseButton = function () {
		this.clicked = false;
	};

	MouseButton.prototype.getState = function () {
		return this.clicked;
	};

	return MouseButton;
});