define(['j.System', 'j.inputs'],
function (System, inputs) {

	var selectedObject = -1;

	var editorSystem = new System ({
		masterSystem : true,
		executeInEditMode : true
	});

	editorSystem.down = function (scene, entity, position) {
		console.log(entity, position);
	};

	return editorSystem;
});