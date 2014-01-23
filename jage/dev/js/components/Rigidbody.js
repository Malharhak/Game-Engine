define(["j.Shapes", 'j.Circle', 'j.Box', 'j.Vector2', 'j.editGui'],
 function (Shapes, Circle, Box, Vector2, editGui) {
	var shapes = {};
	shapes[Shapes.CIRCLE] = Circle;
	shapes[Shapes.BOX] = Box;

	var Rigidbody = function (params) {
		this.mass = params.mass || 1;
		this.lastAcceleration = params.acceleration || new Vector2(0, 0);
		this.acceleration = this.lastAcceleration;
		this.forces = params.forces || new Vector2(0, 0);
		this.impulses = params.impulses || new Vector2(0, 0);
		this.velocity = params.velocity || new Vector2(0, 0);
		this.nextPosition = params.nextPosition || new Vector2(0, 0);
		this.airFriction = params.airFriction || 1;
		this.friction = params.friction || 1;
		this.bouncy = params.bouncy || 0;
		this.fixed = params.fixed || false;
		this.shape = params.shape || 0;
		this.ignoreCollision = false;

		this.collidingWith = {};
		this.properties = new shapes[this.shape](params.properties);
	};

	Rigidbody.prototype.getProperties = function (gui) {
		var rgd = gui.addFolder('rigidbody');
		rgd.add(this, 'mass');
		rgd.add(this, 'airFriction');
		rgd.add(this, 'friction');
		rgd.add(this, 'bouncy');
		rgd.add(this, 'fixed');

		var shapeChange = rgd.add(this, 'shape', {Circle : 0, Box : 1});
		var self = this;
		var props = rgd.addFolder('properties');
		this.properties.getProperties(props);
		shapeChange.onChange (function (value) {
			self.shape = parseInt(value, 10);
			self.properties = new shapes[self.shape]({});
			editGui.removeFolder(rgd, 'properties');
			props = rgd.addFolder('properties');
			self.properties.getProperties(props);
		});
	};

	Rigidbody.prototype.export = function () {
		return {
			shape : this.shape,
			mass : this.mass,
			airFriction: this.airFriction,
			friction : this.friction,
			bouncy : this.bouncy,
			fixed : this.fixed,
			properties : this.properties
		};
	};

	return Rigidbody;
});