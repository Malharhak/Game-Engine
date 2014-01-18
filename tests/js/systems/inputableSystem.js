define (['j.System', 'j.inputs',  'j.ButtonsMapping', 'j.physics',
 'j.Vector2'],
function (System, inputs, Buttons, physics,
 Vector2) {

	var inputableSystem = new System ({
		usedComponents : ['rigidbody', 'inputable']
	});

	inputableSystem.inputs = function (scene, entity) {
		var rigidbody = scene.getComponentForEntity('rigidbody', entity._id);
		if (inputs.getButtonDown ("LEFT")) {
			physics.applyForce(rigidbody, new Vector2(-10, 0));
		}
		if (inputs.getButtonDown ("RIGHT")) {
			physics.applyForce(rigidbody, new Vector2(10, 0));
		}

		if (inputs.getButtonDown("JUMP")) {
			console.log("jump");
			physics.applyForce(rigidbody, new Vector2(0, 20));
		}
	};

	return inputableSystem;
});