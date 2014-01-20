define(['j.time'], function (time) {
	var GameKey = function () {
		this.clickTimer = 0.4;
		this.pushed = false;
		this.justPushed = false;
		this.justUp = false;
		this.lastAction = false;
		this.justClicked = true;
		this.lastClick = time.time;
	};

	GameKey.prototype.push = function () {
		this.pushed = true;
		if (this.lastAction !== "push") {
			this.justPushed = true;
			this.lastClick = time.time;
		}
		this.lastAction = "push";
	};

	GameKey.prototype.release = function () {
		this.pushed = false;
		if (this.lastAction !== "release") {
			this.justUp = true;
			if (time.time - this.lastClick < this.clickTimer) {
				this.justClicked = true;
			}
		}
		this.lastAction = "release";
	};

	GameKey.prototype.postInput = function () {
		this.justPushed = false;
		this.justUp = false;
		this.justClicked = false;
	};

	return GameKey;
});