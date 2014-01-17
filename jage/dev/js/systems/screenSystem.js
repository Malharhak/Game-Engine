define (['j.System', 'j.canvas'], function (System, canvas) {
	var screenSystem = new System({
		masterSystem: true
	});

	screenSystem.preRender = function (scene) {
		canvas.ctx.clearRect(0, 0, canvas.options.width, canvas.options.height);
	};

	return screenSystem;
});