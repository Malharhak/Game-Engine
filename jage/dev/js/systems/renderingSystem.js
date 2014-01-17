define(['j.System', 'j.canvas'], function (System, canvas) {
	var renderingSystem = new System(["renderer"], false);
	renderingSystem.render = function (scene, entity) {
		var renderer = scene.getComponentForEntity("renderer", entity._id);
		canvas.ctx.fillStyle = renderer.color;
		canvas.ctx.fillRect(entity.transform.x, entity.transform.y, renderer.width, renderer.height);
		//console.log("coucou", entities[0].transform.x);
	};

	return renderingSystem;
});