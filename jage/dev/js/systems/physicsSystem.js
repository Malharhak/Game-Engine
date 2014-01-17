define(['j.System', 'j.canvas', 'j.Shapes', 'j.world', 'j.time',
 'j.units', 'j.config'],
 function (System, canvas, Shapes, world, time,
 units, config) {
	var physicsSystem = new System({
		usedComponents: ['rigidbody'],
		globalSystem: true
	});

	physicsSystem.start = function (scene) {
		time.timeScale = 0.01;
	};

	physicsSystem.update = function (scene) {
		var entities = scene.getEntitiesForComponents(["rigidbody"]);
		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			var rigidbody = scene.getComponentForEntity("rigidbody", entity._id);
			entity.transform.y -= world.gravity * time.deltaTime * rigidbody.mass;
		}
	};

	physicsSystem.postRender = function (scene) {
		if (config.debug) {
			var entities = scene.getEntitiesForComponents(["rigidbody"]);
			for (var i = 0; i < entities.length; i++) {
				var entity = entities[i];
				var rigidbody = scene.getComponentForEntity("rigidbody", entity._id);
				canvas.ctx.save();

				canvas.ctx.fillStyle = "rgba(0, 250, 0, 0.3)";
				var drawPos;
				switch (rigidbody.shape) {
					case Shapes.CIRCLE:
						var radius = units.sizeConversion(rigidbody.radius);
						drawPos = units.worldToScreen ({
							x : entity.transform.x + rigidbody.center.x,
							y : entity.transform.y + rigidbody.center.y
						});
						canvas.ctx.translate(drawPos.x, drawPos.y);
						if (entity.transform.angle !== 0) {
							canvas.ctx.rotate(entity.transform.angle);
						}
						canvas.ctx.beginPath();
						canvas.ctx.arc(0,
							0,
							radius, 0, Math.PI * 2, true);
						canvas.ctx.closePath();
						canvas.ctx.fill();
					break;
					case Shapes.BOX:
						drawPos = units.worldToScreen ({
							x: entity.transform.x,
							y : entity.transform.y
						});
						var transPos = units.pointSizeConversion ({
							x: rigidbody.box.start.x,
							y: rigidbody.box.start.y
						});
						canvas.ctx.translate(drawPos.x, drawPos.y);
						if (entity.transform.angle !== 0) {
							canvas.ctx.rotate(entity.transform.angle);
						}
						canvas.ctx.fillRect(transPos.x, transPos.y, units.sizeConversion(rigidbody.box.end.x), units.sizeConversion(rigidbody.box.end.y));
					break;
				}
				canvas.ctx.restore();
			}
		}
	};

	return physicsSystem;
});