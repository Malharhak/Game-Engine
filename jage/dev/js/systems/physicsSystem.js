define(['j.System', 'j.canvas', 'j.Shapes', 'j.world', 'j.time',
 'j.units', 'j.config', 'j.Vector2', 'underscore', 'j.aabb', 'j.Rectangle'],
 function (System, canvas, Shapes, world, time,
 units, config, Vector2, _, aabb, Rectangle) {
	var physicsSystem = new System({
		usedComponents: ['rigidbody'],
		globalSystem: true
	});

	physicsSystem.start = function (scene) {
		//time.timeScale = 0.01;
	};

	physicsSystem.update = function (scene) {
		var entities = scene.getEntitiesForComponents(["rigidbody"]);
		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			var rigidbody = scene.getComponentForEntity("rigidbody", entity._id);
			rigidbody.nextPosition = new Vector2(entity.transform.position);
			this.applyForce(rigidbody, new Vector2(0, -world.gravity));

			this.computeForces (rigidbody);
			this.computeCollisions(rigidbody, entity.transform.position);
			entity.transform.position = new Vector2(rigidbody.nextPosition);
			rigidbody.forces = new Vector2(0, 0);
		}
	};

	physicsSystem.computeForces = function (rigidbody) {
		rigidbody.acceleration = rigidbody.forces.scale(1 / rigidbody.mass);
		rigidbody.velocity = rigidbody.velocity.add(rigidbody.acceleration.scale(time.deltaTime));
		rigidbody.direction = rigidbody.velocity.normalize();
		rigidbody.nextPosition = rigidbody.nextPosition.add(rigidbody.velocity.scale(time.deltaTime));
	};

	physicsSystem.computeCollisions = function (rigidbody, position) {
		var col = this.checkWorldBoundaries (rigidbody);
		if (col) {
			rigidbody.velocity = rigidbody.velocity.scale(-rigidbody.bouncy);
			rigidbody.nextPosition = new Vector2(position);
		}
	};

	physicsSystem.checkWorldBoundaries = function (rigidbody) {
		switch (rigidbody.shape) {
			case Shapes.BOX:
				if (rigidbody.nextPosition.y + rigidbody.box.end.y > world.boundaries.end.y ||
					rigidbody.nextPosition.y  + rigidbody.box.start.y < world.boundaries.start.y ||
					rigidbody.nextPosition.x + rigidbody.box.end.x > world.boundaries.end.x ||
					rigidbody.nextPosition.x + rigidbody.box.start.x < world.boundaries.start.x) {
					return true;
				}
			break;
			case Shapes.CIRCLE:
				var circlePoint = rigidbody.nextPosition.add(rigidbody.direction.scale(rigidbody.radius));
				if (circlePoint.y > world.boundaries.end.y ||
					circlePoint.y < world.boundaries.start.y ||
					circlePoint.x > world.boundaries.end.x ||
					circlePoint.x < world.boundaries.start.x) {
					return true;
				}
			break;
		}
	};

	physicsSystem.applyForce = function (rigidbody, force) {
		rigidbody.forces = rigidbody.forces.add(force);
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
							x : entity.transform.position.x + rigidbody.center.x,
							y : entity.transform.position.y + rigidbody.center.y
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
						drawPos = units.worldToScreen (entity.transform.position);
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