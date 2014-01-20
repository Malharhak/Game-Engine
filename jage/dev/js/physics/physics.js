define(['j.aabb', 'j.circlecircle', 'j.Shapes', 'j.Rectangle', 'j.Circle', 'j.time',
 'j.world', 'j.Collision', 'j.Vector2'],
 function (aabb, circleCircle, Shapes, Rectangle, Circle, time,
 world, Collision, Vector2) {
	var Physics = function () {

	};


	Physics.prototype.applyForce = function (rigidbody, force) {
		if (rigidbody.fixed) {
			return;
		}
		rigidbody.forces = rigidbody.forces.add (force);
	};
	Physics.prototype.applyImpulse = function (rigidbody, impulse) {
		if (rigidbody.fixed) {
			return;
		}
		rigidbody.impulses = rigidbody.impulses.add(impulse);
	};

	Physics.prototype.resolveCollision = function (body1, body2) {
		body1.velocity = body1.velocity.scale(-body1.bouncy);
		this.computePosition (body1);
	};

	Physics.prototype.computeForces = function (rigidbody) {
		rigidbody.acceleration = rigidbody.forces.scale(1 / rigidbody.mass);
		rigidbody.acceleration = rigidbody.acceleration.add(rigidbody.impulses.scale(1 / rigidbody.mass).scale(time.deltaTime));
		rigidbody.velocity = rigidbody.velocity.add(rigidbody.impulses.scale(1 / rigidbody.mass));
	};
	Physics.prototype.computeVelocity = function (rigidbody) {
		rigidbody.velocity = rigidbody.velocity.add(rigidbody.acceleration.scale(time.deltaTime / 2));
	};

	Physics.prototype.computePosition = function (rigidbody) {
		rigidbody.direction = rigidbody.velocity.normalize();
		rigidbody.futurePosition = rigidbody.lastPosition.add(rigidbody.velocity.scale(time.deltaTime));
	};
	Physics.prototype.processCollisions = function (entity, rigidbody, allBodies, onEnter, onExit) {
		var axis = ["x", "y"];
		for (var i = 0; i < axis.length; i++) {
			var ax = axis[i];
			this.nextPositionAxis (rigidbody, ax);
			var objs = this.computeCollisions(rigidbody, rigidbody.nextPosition, allBodies);
			var col = false;
			var newCollidingWith = {};
			for (var c = 0; c < objs.length; c++) {
				var body2 = objs[c];
				var colResult = this.processCollision (entity, rigidbody, body2, ax, onEnter);
				if (colResult === 2 || colResult === 1) {
					col = true;
				}
				newCollidingWith[body2._id] = true;
			}
			for (var o in rigidbody.collidingWith) {
				if (!newCollidingWith[o]) {
					onExit(entity, rigidbody, o);
					delete rigidbody.collidingWith[o];
				}
			}
			_.extend(rigidbody.collidingWith, newCollidingWith);
			this.applyFriction (rigidbody, axis[(i + 1) % 2], col);
		}
	};

	Physics.prototype.processCollision = function (entity, rigidbody, body2, ax, onEnter) {
		if (rigidbody.collidingWith[body2._id]) {
			return 0;
		} else {
			onEnter(entity, rigidbody, body2);
			if (rigidbody.ignoreCollision) {
				rigidbody.ignoreCollision = false;
				return 1;
			} else {
				this.applyImpulse(body2, rigidbody.velocity.scale(rigidbody.mass));
				this.answerCollisionAxis(rigidbody, ax);
				return 2;
			}
		}
	};

	Physics.prototype.nextPositionAxis = function (rigidbody, axis) {
		rigidbody.nextPosition[axis] = rigidbody.futurePosition[axis];
	};
	/* TODO: Refactor the X and Y versions in a single function */
	Physics.prototype.answerCollisionAxis = function (rigidbody, axis) {
			rigidbody.nextPosition[axis] = rigidbody.lastPosition[axis];
			rigidbody.velocity[axis] = rigidbody.velocity[axis] * -rigidbody.bouncy;
	};
	// If there was a collision, apply friction. Otherwise use air friction
	Physics.prototype.applyFriction = function (rigidbody, axis, collision) {
		rigidbody.velocity[axis] *= collision ? rigidbody.friction : rigidbody.airFriction;
	};

	Physics.prototype.computeCollisions = function (rigidbody, position, allBodies) {
		return this.checkCollision (position, rigidbody, allBodies);
	};

	Physics.prototype.checkWorldBoundaries = function (rigidbody) {
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
	Physics.prototype.checkCollision = function (position, body1, allBodies) {
		var objs = [];
		for (var i in allBodies) {
			var body2 = allBodies[i].rigidbody;
			var pos2 = allBodies[i].entity.transform.position;
			if (body1._id === body2._id) {
				continue;
			}
			var collisionResult;
			if (body1.shape === Shapes.CIRCLE && body2.shape === Shapes.CIRCLE) {
				collisionResult = this.circleCircle(body1, body2, position, pos2);
			} else if (body1.shape === Shapes.BOX && body2.shape === Shapes.BOX) {
				collisionResult = this.boxBox(body1, body2, position, pos2);
			} else if ((body1.shape === Shapes.BOX && body2.shape === Shapes.CIRCLE) ||
				(body1.shape === Shapes.CIRCLE && body2.shape === Shapes.BOX)) {
				collisionResult = this.boxCircle(body1, body2, position, pos2);
			}
			if (collisionResult) {
				objs.push(body2);
			} else {
				continue;
			}
		}
		return objs;
	};

	Physics.prototype.circleCircle = function (body1, body2, position, pos2) {
		var circle1 = new Circle ({
			center: body1.center.add(position),
			radius: body1.radius
		});
		var circle2 = new Circle ({
			center: body2.center.add(pos2),
			radius : body2.radius
		});
		if (circleCircle(circle1, circle2)) {
			return true;
		} else {
			return false;
		}
	};

	Physics.prototype.boxBox = function (body1, body2, position, pos2) {
		var box1 = new Rectangle({
			start : body1.box.start.add(position),
			end : body1.box.end
		});
		var box2 = new Rectangle({
			start : body2.box.start.add(pos2),
			end : body2.box.end
		});
		if (aabb(box1, box2)) {
				return true;
		} else {
			return false;
		}
	};
	Physics.prototype.boxCircle = function (body1, body2, position, pos2) {
		var first = body1.shape === Shapes.BOX ? true : false;
		var circleBody;
		var boxBody;
		var circlePosition;
		var boxPosition;
		if (first) {
			boxBody = body1;
			boxPosition = position;
			circleBody = body2;
			circlePosition = pos2;
		} else {
			boxBody = body2;
			boxPosition = pos2;
			circleBody = body1;
			circlePosition = position;
		}
		var box1 = new Rectangle({
			start : boxBody.box.start.add(boxPosition),
			end : boxBody.box.end
		});
		var box2 = new Rectangle ({
			start : circleBody.center.add(circlePosition).add(new Vector2(-circleBody.radius, -circleBody.radius)),
			end : new Vector2(circleBody.radius * 2, circleBody.radius * 2)
		});
		if (aabb(box1, box2)) {
				return true;
		} else {
			return false;
		}
	};

	Physics.prototype.pointBox = function (point, box) {
		if (point.x > box.start.x &&
			point.x < box.start.x + box.end.x &&
			point.y > box.start.y &&
			point.y < box.start.y + box.end.y) {
			return true;
		} else {
			return false;
		}
	};
	Physics.prototype.pointCircle = function (point, circle) {
		if (Math.abs (circle.center.sub(point).length()) <= circle.radius) {
			return true;
		} else {
			return false;
		}
	};
	return new Physics();
});