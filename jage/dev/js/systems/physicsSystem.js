define(['j.System', 'j.canvas', 'j.Shapes', 'j.world', 'j.time',
 'j.units', 'j.config', 'j.Vector2', 'underscore', 'j.aabb', 'j.Rectangle', 'j.rendering', 'j.physics', 'j.Collision'],
 function (System, canvas, Shapes, world, time,
 units, config, Vector2, _, aabb, Rectangle, rendering,
 physics, Collision) {
	var physicsSystem = new System({
		usedComponents: ['rigidbody'],
		globalSystem: true
	});

	physicsSystem.start = function (scene) {
		//time.timeScale = 0.01;
	};

	physicsSystem.update = function (scene) {
		var entities = scene.getEntitiesForComponents(["rigidbody"]);
		var allBodies = scene.getEntitiesWithComponents(["rigidbody"]);


		function onEnter (entity, rigidbody, body2) {
			scene.entityEvent('onCollisionEnter', entity, new Collision(rigidbody, body2));
		}
		function onExit (entity, rigidbody, bodyId) {
			scene.entityEvent('onCollisionExit', entity, new Collision(rigidbody, scene.getComponentValue("rigidbody", bodyId)));
		}

		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			var rigidbody = scene.getComponentForEntity("rigidbody", entity._id);
			if (rigidbody.fixed) {
				continue;
			}

			rigidbody.lastPosition = new Vector2(entity.transform.position);
			rigidbody.nextPosition = new Vector2(entity.transform.position);
			physics.applyForce(rigidbody, new Vector2(0, -world.gravity * rigidbody.mass));

			physics.computeForces (rigidbody);
			physics.computeVelocity (rigidbody);
			physics.computePosition(rigidbody);
			physics.processCollisions (entity, rigidbody, allBodies, onEnter, onExit);
			entity.transform.position = new Vector2(rigidbody.nextPosition);
			physics.computeVelocity(rigidbody);
			rigidbody.forces = new Vector2(0, 0);
			rigidbody.impulses = new Vector2(0, 0);
			rigidbody.ignoreCollision = false;
		}
	};

	physicsSystem.postRender = function (scene) {
		if (config.debug) {
			var entities = scene.getEntitiesForComponents(["rigidbody"]);
			for (var i = 0; i < entities.length; i++) {
				var entity = entities[i];
				var rigidbody = scene.getComponentForEntity("rigidbody", entity._id);
				var ctxParams = {
					fillStyle : "rgba(0, 255, 0, 0.3)",
					strokeStyle : "rgba(0, 255, 0, 0.7)",
					lineWidth : 2
				};
				var drawPos;
				switch (rigidbody.shape) {
					case Shapes.CIRCLE:
						rendering.drawCircle ({
							ctx : ctxParams,
							angle: 0,
							radius: rigidbody.radius,
							stroke: true,
							center: entity.transform.position
						});
					break;
					case Shapes.BOX:
						rendering.drawBox ({
							ctx: ctxParams,
							angle: 0,
							center: entity.transform.position,
							start: rigidbody.box.start,
							stroke: true,
							end : rigidbody.box.end
						});
					break;
				}
			}
		}
	};

	return physicsSystem;
});