define([], function () {
	var Renderer = function (params) {
		this.color = params.color || "blue";
		this.width = params.width || 0.4;
		this.height = params.height || 0.4;
		this.pivot = params.pivot || {
			x : this.width / 2,
			y : this.width / 2
		};
	};

	return Renderer;
});