define([], function () {
	var Physics = function () {

	};

	Physics.prototype.applyForce = function (rigidbody, force) {
		rigidbody.forces = rigidbody.forces.add (force);
	};

	return new Physics();
});