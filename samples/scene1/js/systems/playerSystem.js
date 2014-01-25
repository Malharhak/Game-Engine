define (['j.System', 'j.canvas', 'j.inputs', 'j.physics', 'j.Vector2'],
 function (System, canvas, inputs, physics, Vector2) {
	var playerSystem = new System({
		usedComponents : ['player']
	});

	playerSystem.render = function (scene, entity) {
		canvas.ctx.font = "20 px Arial";
		canvas.ctx.fillStyle = "black";
		var playerComponent = scene.getComponentForEntity('player', entity._id);
		canvas.ctx.fillText(playerComponent.name, entity.transform.position.x - 50, entity.transform.position.y - 50);
	};

	playerSystem.inputs = function (scene, entity) {
		var rigidbody = scene.getComponentForEntity('rigidbody', entity._id);
		if (inputs.getButton("LEFT")) {
			physics.applyForce(rigidbody, new Vector2(-12, 0));
		}
		if (inputs.getButton("RIGHT")) {
			physics.applyForce(rigidbody, new Vector2(12, 0));
		}
		if (inputs.getButtonDown("JUMP")) {
			physics.applyImpulse(rigidbody, new Vector2(0, 12));
		}
	};

	return playerSystem;
});