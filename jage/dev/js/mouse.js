define(['j.Point', 'j.Vector2', 'j.units', 'j.MouseButtons', 'j.GameKey'],
 function (Point, Vector2, units, MouseButtons, GameKey) {
	var Mouse = function () {
		this.buttons = [];
		this.screenPosition = new Point();
		this.worldPosition = new Vector2();
		this.cameraPosition = new Vector2();
		this.deltaPosition = new Vector2();
		this.buttons[MouseButtons.LEFT] = new GameKey();
		this.buttons[MouseButtons.RIGHT] = new GameKey();
		this.buttons[MouseButtons.MIDDLE] = new GameKey();
	};

	Mouse.prototype.getButton = function (button) {
		return this.buttons[button].pushed;
	};
	Mouse.prototype.getButtonDown = function (button) {
		return this.buttons[button].justPushed;
	};
	Mouse.prototype.getButtonUp = function (button) {
		return this.buttons[button].justUp;
	};
	Mouse.prototype.getClick = function (button) {
		return this.buttons[button].justClicked;
	};

	Mouse.prototype.updatePosition = function (position) {
		this.lastScreenPosition = new Point(this.screenPosition);
		this.lastWorldPosition = new Vector2(this.worldPosition);
		this.lastCameraPosition = new Vector2(this.cameraPosition);

		this.screenPosition = new Point(position);
		this.worldPosition = units.screenToWorld(position);
		this.cameraPosition = units.screenToCamera(position);
		this.deltaPosition = this.worldPosition.sub(this.lastWorldPosition);
	};

	Mouse.prototype.buttonEvent = function (event, button) {
		if (event === "up") {
			this.buttons[button].release();
		} else {
			this.buttons[button].push();
		}
	};

	return new Mouse();
});