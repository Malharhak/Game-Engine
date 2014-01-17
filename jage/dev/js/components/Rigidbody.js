define(["j.Shapes", 'j.CircleCollider', 'j.BoxCollider'],
 function (Shapes, CircleCollider, BoxCollider) {
	var shapes = {};
	shapes[Shapes.CIRCLE] = CircleCollider;
	shapes[Shapes.BOX] = BoxCollider;

	var Rigidbody = function (params) {
		this.mass = params.mass || 0;
		this.friction = params.friction || 1;
		this.bouncy = params.bouncy || 0;
		this.shape = params.shape || 0;
		_.extend(this, new shapes[this.shape](params.properties));
	};

	return Rigidbody;
});