define ([], function () {
	var componentTypes = function () {

	};


	componentTypes.prototype.registerComponent = function (name, klass) {
		this[name] = klass;
	};
	return new componentTypes();
});