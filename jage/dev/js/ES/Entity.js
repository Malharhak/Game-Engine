define (['j.Transform'], function (Transform) {
	var Entity = function (params) {
		this.label = params.label || "";
		this._id = params.id;
		this.transform = new Transform(params.transform || {});
	};
	Entity.prototype.getComponent = function (scene, componentType) {
		return scene.getComponentValue(componentType, this._id);
	};

	return Entity;
});