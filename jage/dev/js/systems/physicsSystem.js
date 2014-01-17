define(['j.System', 'j.canvas', 'j.Shapes', 'j.world', 'j.time'],
 function (System, canvas, Shapes, world, time) {
	var physicsSystem = new System({
		usedComponents: ['rigidbody'],
		globalSystem: true
	});
	physicsSystem.update = function (scene) {
		var entities = scene.getEntitiesForComponents(["rigidbody"]);
		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			entity.transform.y += world.gravity * time.deltaTime;
		}
	};

	physicsSystem.postRender = function (scene) {
		var entities = scene.getEntitiesForComponents(["rigidbody"]);
		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			var rigidbody = scene.getComponentForEntity("rigidbody", entity._id);
			canvas.ctx.fillStyle = "rgba(0, 250, 0, 0.3)";
			switch (rigidbody.shape) {
				case Shapes.CIRCLE:
					canvas.ctx.beginPath();
					canvas.ctx.arc(entity.transform.x + rigidbody.center.x,
						entity.transform.y + rigidbody.center.y,
						rigidbody.radius, 0, Math.PI * 2, true);
					canvas.ctx.closePath();
					canvas.ctx.fill();
				break;
				case Shapes.BOX:
					canvas.ctx.fillRect(entity.transform.x + rigidbody.box.start.x,
						entity.transform.y + rigidbody.box.start.y,
						rigidbody.box.end.x,
						rigidbody.box.end.y);
				break;
			}
		}
	};

	return physicsSystem;
});