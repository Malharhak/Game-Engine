define(['j.camera', 'j.viewport', 'j.Point'], function (camera, viewport, Point) {
	var Units = function () {

	};

	Units.prototype.sizeConversion = function (value) {
		return viewport.convertUnit(value);
	};
	Units.prototype.pointSizeConversion = function (position) {
		return new Point ({
			x: this.sizeConversion(position.x),
			y : this.sizeConversion(position.y)
		});
	};

	Units.prototype.worldToScreen = function (position) {
		var camPoint = camera.convertPosition(position);
		var screenPoint = viewport.convertPosition(camPoint);
		return screenPoint;
	};

	return new Units();
});