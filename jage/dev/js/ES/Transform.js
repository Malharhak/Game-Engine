define(['j.Vector2'], function (Vector2) {
	var Transform = function (params) {
		this.position = new Vector2(params.position);
		this.angle = params.angle || 0;
		this.parent = params.parent || -1;
	};

	Transform.prototype.getProperties = function (gui) {
		//this.position.getProperties(pos);
		var self = this;
		gui.add(self, 'angle');
		gui.add(self, 'parent');
	};

	return Transform;
});