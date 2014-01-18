define([], function () {
	var GameKey = function () {
		this.pushed = false;
		this.justPushed = false;
		this.justUp = false;
		this.lastAction = false;
	};

	GameKey.prototype.push = function () {
		this.pushed = true;
		if (this.lastAction !== "push") {
			this.justPushed = true;
		}
		this.lastAction = "push";
	};

	GameKey.prototype.release = function () {
		this.pushed = false;
		if (this.lastAction !== "release") {
			this.justUp = true;
		}
		this.lastAction = "release";
	};

	return GameKey;
});