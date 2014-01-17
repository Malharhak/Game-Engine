define([], function () {
	var Renderer = function (params) {
		this.color = "blue" || params.color;
		this.width = 40 || params.width;
		this.height = 40 || params.height;
	};

	return Renderer;
});