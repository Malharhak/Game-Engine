define(["j.Shapes", 'j.Circle', 'j.Box', 'j.Vector2'],
 function (Shapes, Circle, Box, Vector2) {
	var shapes = {};
	shapes[Shapes.CIRCLE] = Circle;
	shapes[Shapes.BOX] = Box;

	var Rigidbody = function (params) {
		this.mass = params.mass || 0;
		this.lastAcceleration = params.acceleration || new Vector2(0, 0);
		this.acceleration = this.lastAcceleration;
		this.forces = params.forces || new Vector2(0, 0);
		this.velocity = params.velocity || new Vector2(0, 0);
		this.nextPosition = params.nextPosition || new Vector2(0, 0);
		this.friction = params.friction || 1;
		this.bouncy = params.bouncy || 0;
		this.shape = params.shape || 0;
		_.extend(this, new shapes[this.shape](params.properties));
	};

	return Rigidbody;
});