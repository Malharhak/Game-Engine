define (['jquery'], function ($) {
	var Canvas = function () {

	};

	Canvas.prototype.init = function (options) {
		this.options = options;
		this.container = $(options.mainContainer);
		this.canvas = $('<canvas />').appendTo(this.container);
		this.canvas.attr({
			'width' : options.width,
			'height': options.height
		});
		this.ctx = this.canvas.getContext('2d');
	};

	return new Canvas();
});