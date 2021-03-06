define([], function () {
	var Time = function () {
		this.initTime = (Date.now() / 1000);
		this.timeScale = 1;
	};

	Time.prototype.preUpdate = function () {
		this.time = (Date.now() / 1000);
		this.deltaTime = (this.time - this.lastTime) * this.timeScale;
		this.lastTime = (Date.now() / 1000);
	};

	Time.prototype.postUpdate = function () {
	};

	Time.prototype.start = function () {
		this.startTime = (Date.now() / 1000);
		this.lastTime = (Date.now() / 1000);
		this.time = (Date.now() / 1000);
	};
	Time.prototype.pause = function () {
		this.pauseTime = (Date.now() / 1000);
	};

	Time.prototype.resume = function () {
		this.resumeTime = (Date.now() / 1000);
		this.lastTime = this.resumeTime;
	};

	return new Time();
});