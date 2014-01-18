define(['j.ButtonsMapping', 'j.canvas', 'j.GameKey'],
 function (ButtonsMapping, canvas, GameKey) {
	var Inputs = function () {
		this.keys = {};
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
			this.keys[i].justPushed = false;
			this.keys[i].justUp = false;
		}
	};

	Inputs.prototype.init = function () {
		for (var i in ButtonsMapping) {
			this.keys[i] = new GameKey(ButtonsMapping[i]);
		}

		var self = this;
		$(window).on('keydown', function (event) {
			var key = event.keyCode || event.which;
			for (var i in ButtonsMapping) {
				if (ButtonsMapping[i][1] === key) {
					self.keys[i].push();
				}
			}
			event.preventDefault();
			return false;
		});

		$(window).on('keyup', function (event) {
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