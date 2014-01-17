define(['j.System', 'j.canvas', 'j.camera', 'j.units', 'j.config'],
 function (System, canvas, camera, units, config) {
	var renderingSystem = new System({
		usedComponents: ["renderer"]
	});

	renderingSystem.render = function (scene, entity) {
		var renderer = scene.getComponentForEntity("renderer", entity._id);
		var transformSize = units.worldToScreen (entity.transform);
		var pivotSize = units.pointSizeConversion({
			x: -renderer.pivot.x,
			y : -renderer.pivot.y
		});

		var render = camera.isInside({
			start: entity.transform,
			end : {
				x: renderer.width,
				y : renderer.height
			}
		});
		var rendWidth = units.sizeConversion (renderer.width);
		var rendHeight = units.sizeConversion (renderer.height);
		canvas.ctx.save();
		canvas.ctx.fillStyle = renderer.color;
		canvas.ctx.translate(transformSize.x, transformSize.y);
		if (entity.transform.angle !== 0) {
			canvas.ctx.rotate(entity.transform.angle);
		}
		canvas.ctx.fillRect(pivotSize.x, pivotSize.y, rendWidth, rendHeight);
		if (config.debug) {
			this.drawGizmo (entity.transform);
		}
		canvas.ctx.restore();
	};
	renderingSystem.drawGizmo = function () {
		var gizmo = {x : 0, y : 0};
		canvas.ctx.lineWidth = 2;
		canvas.ctx.strokeStyle = "blue";
		canvas.ctx.beginPath();
		canvas.ctx.moveTo(gizmo.x, gizmo.y);
		canvas.ctx.lineTo(gizmo.x + 20, gizmo.y);
		canvas.ctx.closePath();
		canvas.ctx.stroke();
		canvas.ctx.beginPath();
		canvas.ctx.strokeStyle = "green";
		canvas.ctx.moveTo(gizmo.x, gizmo.y);
		canvas.ctx.lineTo(gizmo.x, gizmo.y - 20);
		canvas.ctx.closePath();
		canvas.ctx.stroke();
	};

	return renderingSystem;
});