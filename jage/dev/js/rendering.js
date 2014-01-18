define(['j.camera', 'j.viewport', 'j.units', 'j.canvas'],
function (camera, viewport, units, canvas) {
	var Rendering = function () {

	};

	Rendering.prototype.drawCircle = function (params) {
			if (typeof params !== "object") {
				return;
			}
			this.prepareCanvas (params.ctx);
			var drawRadius = units.sizeConversion (params.radius);
			var drawPos = units.worldToScreen(params.center);
			canvas.ctx.translate(drawPos.x, drawPos.y);
			this.rotateCanvas(params.angle);
			canvas.ctx.beginPath();
			canvas.ctx.arc(0, 0, drawRadius, 0, Math.PI * 2, true);
			canvas.ctx.closePath();
			canvas.ctx.fill();
			if (params.gizmo) {
				this.drawGizmo ();
			}
			this.endCanvas();
	};

	Rendering.prototype.drawBox = function (params) {
		if (typeof params !== "object") {
			return;
		}
		this.prepareCanvas (params.ctx);
		var centerPos = units.worldToScreen(params.center);
		var transPos = units.pointSizeConversion(params.start);
		var endPos = units.pointSizeConversion (params.end);
		canvas.ctx.translate(centerPos.x, centerPos.y);
		this.rotateCanvas(params.angle);
		canvas.ctx.fillRect(transPos.x, transPos.y, endPos.x, endPos.y);
		if (params.gizmo) {
			this.drawGizmo ();
		}
		this.endCanvas();
	};

	Rendering.prototype.drawGizmo = function () {
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

	Rendering.prototype.rotateCanvas = function (angle) {
		if (typeof angle === "number" && angle !== 0) {
			canvas.ctx.rotate(angle);
		}
	};

	Rendering.prototype.prepareCanvas = function (params) {
		canvas.ctx.save();
		if (typeof params === "object") {
			for (var i in params) {
				canvas.ctx[i] = params[i];
			}
		}
	};
	Rendering.prototype.endCanvas = function () {
		canvas.ctx.restore();
	};

	return new Rendering();
 });