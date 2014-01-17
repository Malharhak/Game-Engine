define(['underscore'], function (_) {
	var  Config = function () {

	};

	Config.prototype.init = function (props) {
		_.extend(this, props);
	};

	return new Config();
});