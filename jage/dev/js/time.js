define([], function () {
	var Time = function () {
		this.initTime = (Date.now() / 1000);
		this.timeScale = 1;
	};

	Time.prototype.preUpdate = function () {
		this.time = (Date.now() / 1000);
		this.deltaTime = (this.time - this.lastTime) * this.timeScale;
	};

	Time.prototype.postUpdate = function () {
		this.lastTime = (Date.now() / 1000);
	};

	Time.prototype.start = function () {
		this.startTime = (Date.now() / 1000);
		this.lastTime = (Date.now() / 1000);
		this.time = (Date.now() / 1000);
	};

	return new Time();
});