define([], function () {
	var Systems = function () {

	};

	Systems.prototype.registerSystem = function (name, obj) {
		this[name] = obj;
	};

	return new Systems();
});