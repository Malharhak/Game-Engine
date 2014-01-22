define (['j.System', 'j.MouseButtons', 'j.physics', 'j.Shapes', 'j.Circle', 'j.Vector2',
 'j.Rectangle', 'j.mouse'],
 function (System, MouseButtons, physics, Shapes, Circle, Vector2,
 Rectangle, mouse) {
	var mouseSystem = new System({
		usedComponents : ['renderer'],
		masterSystem : true,
		executeInEditMode : true
	});

	mouseSystem.inputs = function (scene) {
		for (var button = 1; button < 4; button++) {
			if (mouse.getButtonDown (button)) {
				this.action(scene, button, "down");
			}
			if (mouse.getButton (button)) {
				this.action(scene, button, "button");
			}
			if (mouse.getButtonUp (button)) {
				this.action(scene, button, "up");
			}
			if (mouse.getClick (button)) {
				this.action (scene, button, "click");
			}
		}
	};

	mouseSystem.action = function (scene, button, evt) {
		var position = mouse.worldPosition;
		var entities = scene.getEntitiesForComponents(["renderer"]);
		var hasCollided = false;
		for (var i = 0; i < entities.length; i++) {
			var entity = entities[i];
			var renderer = scene.getComponentForEntity("renderer", entity._id);
			var collided = false;
			switch (renderer.shape) {
				case Shapes.CIRCLE:
					collided = physics.pointCircle(position, new Circle({
						radius : renderer.radius,
						center : new Vector2(entity.transform.position.add(renderer.properties.center))
					}));
				break;
				case Shapes.BOX:
					collided = physics.pointBox (position, new Rectangle({
						start : entity.transform.position.add(renderer.properties.start),
						end : renderer.properties.end
					}));
				break;
			}
			if (collided) {
				hasCollided = true;
				scene.entityEvent (evt, entity);
			}
		}
		if (!hasCollided) {
			scene.entityEvent(evt, false);
		}
	};
	return mouseSystem;
});