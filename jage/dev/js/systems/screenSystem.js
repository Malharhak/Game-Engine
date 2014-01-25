define (['j.System', 'j.canvas', 'j.camera', 'j.world', 'j.config'],
 function (System, canvas, camera, world, config) {
	var screenSystem = new System({
		masterSystem: true,
		executeInEditMode : true
	});

	screenSystem.preRender = function (scene) {
		canvas.ctx.fillStyle = "#7777bb";
		canvas.ctx.fillRect(0, 0, camera.box.end.x * world.unitSize, camera.box.end.y * world.unitSize);
		if (config.engine.debug) {
			canvas.ctx.lineWidth = 1;
			canvas.ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
			for (var x = Math.abs(1 - (camera.box.start.x % 1)); x < camera.box.end.x; x++) {
					canvas.ctx.beginPath();
					canvas.ctx.moveTo (x * world.unitSize, 0);
					canvas.ctx.lineTo (x * world.unitSize, camera.box.end.y * world.unitSize);
					canvas.ctx.closePath();
					canvas.ctx.stroke();
			}
			for (var y = Math.abs(camera.box.start.y) ; y > 0 ; y--) {
					canvas.ctx.beginPath();
					canvas.ctx.moveTo (0 , y * world.unitSize);
					canvas.ctx.lineTo (camera.box.end.x * world.unitSize, y * world.unitSize);
					canvas.ctx.closePath();
					canvas.ctx.stroke();
			}
		}
	};

	return screenSystem;
});