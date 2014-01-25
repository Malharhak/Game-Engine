define(['j.ButtonsMapping', 'j.canvas', 'j.GameKey', 'j.mouse'],
 function (ButtonsMapping, canvas, GameKey, mouse) {
	var Inputs = function () {
		this.keys = {};
		this.mouse = mouse;
	};

	Inputs.prototype.getButton = function (button) {
		if (typeof this.keys[button] === "object") {
			return this.keys[button].pushed;
		} else {
			return false;
		}
	};
	Inputs.prototype.getButtonDown = function (button) {
		if (typeof this.keys[button] === "object") {
			return this.keys[button].justPushed;
		} else {
			return false;
		}
	};
	Inputs.prototype.getButtonUp = function (button) {
		if (typeof this.keys[button] === "object") {
			return this.keys[button].justUp;
		} else {
			return false;
		}
	};

	Inputs.prototype.postInputs = function (button) {
		for (var i in this.keys) {
			this.keys[i].postInput();
		}
		for (var m = 1; m < 4; m++) {
			mouse.buttons[m].postInput();
		}
	};


	Inputs.prototype.onDown = function (event) {
		var button = event.which || event.button;
		mouse.buttonEvent("down", button);
		event.stopPropagation();
		event.cancelBubble = true;
		event.preventDefault();
		return false;
	};
	Inputs.prototype.onUp = function (event) {
		var button = event.which || event.button;
		mouse.buttonEvent("up", button);
	};
	Inputs.prototype.onMove = function (position) {
		mouse.updatePosition(position);
	};
	Inputs.prototype.init = function () {
		for (var i in ButtonsMapping) {
			this.keys[i] = new GameKey(ButtonsMapping[i]);
		}

		var self = this;
		canvas.container.on('mousedown', function (event) {
			self.onDown (event);
		});
		canvas.container.on('contextmenu', function (event) {
			return false;
		});
		canvas.bindMouseMove ('mousemove', function (position) {
			self.onMove(position);
		});
		$(window).on('mouseup', function (event) {
			self.onUp (event);
		});
		canvas.container.on('keydown', function (event) {
			var key = event.keyCode || event.which;
			for (var i in ButtonsMapping) {
				if (ButtonsMapping[i][1] === key) {
					self.keys[i].push();
				}
			}
			event.preventDefault();
			return false;
		});

		canvas.canvas.on('keyup', function (event) {
			var key = event.keyCode || event.which;
			for (var i in ButtonsMapping) {
				if (ButtonsMapping[i][1] === key) {
					self.keys[i].release();
				}
			}
			event.preventDefault();
			return false;
		});
	};

	return new Inputs();
});