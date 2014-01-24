define (['jquery', 'j.RenderingModes'], function ($, RenderingModes) {
	var Canvas = function () {

	};

	Canvas.prototype.init = function (options) {
		this.options = options;
		this.container = $(options.mainContainer);
		this.canvas = $('<canvas />').appendTo(this.container).attr('tabindex', 1);
		switch (options.renderingMode) {
			case RenderingModes.EXTEND :
				this.setExtendedMode(options);
			break;
			case RenderingModes.FIXED :
				this.setFixedMode(options);
			break;
		}
		this.ctx = this.canvas[0].getContext('2d');
	};

	Canvas.prototype.setSize = function (width, height) {
		this.width = width;
		this.height = height;
		this.canvas.attr({
			'width' : width,
			'height' : height
		});
		if (typeof this.resizeCallback === "function") {
			this.resizeCallback (width, height);
		}
	};

	Canvas.prototype.setExtendedMode = function (options) {
		this.setSize(this.container.width(), this.container.height());

		var self = this;
		$(window).on('resize', function (event) {
			self.setSize(self.container.width(), self.container.height());
		});
	};

	Canvas.prototype.setResizeCallback = function (callback) {
		this.resizeCallback = callback;
		this.resizeCallback(this.width, this.height);
	};

	Canvas.prototype.setFixedMode = function (options) {
		this.setSize(options.width, options.height);
	};

	Canvas.prototype.processMouseEvent = function (event) {
		var offset = this.container.offset();
		return {
			x : event.pageX - offset.left,
			y : event.pageY - offset.top
		};
	};

	Canvas.prototype.bindMouseMove = function (evt, callback) {
		var self = this;
		this.container.on(evt, function (event) {
			callback(self.processMouseEvent(event));
		});
	};

	return new Canvas();
});