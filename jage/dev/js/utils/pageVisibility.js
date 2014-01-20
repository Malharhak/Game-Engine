define ([], function () {

	var hidden, visibilityChange;
	if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
		hidden = "hidden";
		visibilityChange = "visibilitychange";
	} else if (typeof document.mozHidden !== "undefined") {
		hidden = "mozHidden";
		visibilityChange = "mozvisibilitychange";
	} else if (typeof document.msHidden !== "undefined") {
		hidden = "msHidden";
		visibilityChange = "msvisibilitychange";
	} else if (typeof document.webkitHidden !== "undefined") {
		hidden = "webkitHidden";
		visibilityChange = "webkitvisibilitychange";
	}

	var PageVisibility = function () {
		this.onHides = [];
		this.onVisibles = [];

		var self = this;
		document.addEventListener(visibilityChange, function () {
			if (document[hidden]) {
				self.hidden();
			} else {
				self.visible();
			}
		}, false);
	};

	PageVisibility.prototype.onHide = function (fnc) {
		if (typeof fnc === "function") {
			this.onHides.push(fnc);
		}
	};

	PageVisibility.prototype.onVisible = function (fnc) {
		if (typeof fnc === "function") {
			this.onVisibles.push(fnc);
		}
	};

	PageVisibility.prototype.hidden = function () {
		for (var i = 0; i < this.onHides.length; i++) {
			this.onHides[i]();
		}
	};

	PageVisibility.prototype.visible = function () {
		for (var i = 0; i < this.onVisibles.length; i++) {
			this.onVisibles[i]();
		}
	};

	return new PageVisibility();
});