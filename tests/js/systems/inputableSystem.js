define (['j.System', 'j.inputs',  'j.ButtonsMapping', 'j.physics',
 'j.Vector2'],
function (System, inputs, Buttons, physics,
 Vector2) {

	var maxSpeed = 20;
	var inputableSystem = new System ({
		usedComponents : ['rigidbody', 'inputable']
	});

	inputableSystem.inputs = function (scene, entity) {
		var rigidbody = scene.getComponentForEntity('rigidbody', entity._id);
		if (inputs.getButton ("LEFT")) {
			physics.applyForce(rigidbody, new Vector2(-12, 0));
		}
		if (inputs.getButton ("RIGHT")) {
			physics.applyForce(rigidbody, new Vector2(12, 0));
		}

		if (inputs.getButtonDown("JUMP")) {
			console.log("jump");
			physics.applyImpulse(rigidbody, new Vector2(0, 12));
		}
		if (rigidbody.velocity.length() > maxSpeed) {
			rigidbody.velocity = rigidbody.velocity.normalize().scale(maxSpeed);
		}
	};

	inputableSystem.down = function (scene, entity, position) {
		if (entity.tag === "box") {
			var rigidbody = scene.getComponentForEntity("rigidbody", entity._id);
			physics.applyImpulse(rigidbody, new Vector2(0, 4));
			console.log("down on ", entity.label);
		}
	};
	inputableSystem.onCollisionEnter = function (scene, entity, collision) {
		var otherEntity = scene.getEntityForComponent(collision.collided);
		if (otherEntity.tag === "box") {
			collision.rigidbody.ignoreCollision = true;
			console.log("Collision : ", entity.label, otherEntity.label);
		}
	};
	inputableSystem.onCollisionExit = function (scene, entity, collision) {
		var otherEntity = scene.getEntityForComponent(collision.collided);
		if (otherEntity.tag === "box") {
			console.log("Collision out : ", entity.label, otherEntity.label);
		}
	};
	return inputableSystem;
});