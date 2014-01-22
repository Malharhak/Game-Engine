define(['j.System', 'j.inputs', 'j.MouseButtons', 'j.Vector2', 'j.editGui',
 'j.ButtonsMapping', 'j.camera', 'j.time'],
function (System, inputs, MouseButtons, Vector2, editGui,
 ButtonsMapping, camera, time) {

	var selectedObject = -1;
	var cameraSpeed = 3;
	var editorSystem = new System ({
		masterSystem : true,
		executeInEditMode : true,
		onlyEditMode : true
	});


	editorSystem.down = function (scene, entity, position) {
		if (entity !== false && entity._id !== selectedObject._id) {
			selectedObject = entity;
			var props = scene.getEntityWithComponents(selectedObject._id);
			editGui.propertiesGui.create({
				entity : props
			});
			for (var i in props) {
				if (typeof props[i].getProperties === "function") {
					props[i].getProperties(editGui.propertiesGui.gui.gui);
				}
			}
		} else {
			editGui.propertiesGui.create({entity : false});
			selectedObject = -1;
		}
	};

	editorSystem.inputs = function (scene) {
		if (selectedObject !== -1 && inputs.mouse.getButton(MouseButtons.LEFT)) {
			selectedObject.transform.position = new Vector2(inputs.mouse.worldPosition);
		}

		var moveVec = new Vector2(0, 0);
		if (inputs.getButton("LEFT")) {
			console.log("coucou");
			moveVec.x = -1;
		}
		if (inputs.getButton("RIGHT")) {
			moveVec.x = 1;
		}
		if (inputs.getButton("FORWARD")) {
			moveVec.y = 1;
		}
		if (inputs.getButton("BACKWARD")) {
			moveVec.y = -1;
		}
		var camAdd = camera.position.add(moveVec.scale(cameraSpeed * time.deltaTime));
		camera.setPosition(camAdd);
	};

	return editorSystem;
});