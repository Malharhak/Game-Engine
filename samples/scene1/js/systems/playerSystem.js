define (['j.System', 'j.canvas'], function (System, canvas) {
	var playerSystem = new System({
		usedComponents : ['player']
	});

	playerSystem.render = function (scene, entity) {
		ctx.font = "20 px Arial";
		ctx.fillStyle = "black";
		var playerComponent = scene.getComponentForEntity('player', entity._id);
		ctx.fillText(playerComponent.name, entity.transform.position.x - 50, entity.transform.position.y - 50);
	};

	return playerSystem;
});