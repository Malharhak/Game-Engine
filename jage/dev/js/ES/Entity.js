define (['j.Transform'], function (Transform) {
	/**
	 * @class Entity
	 * @param {String} .label The label for the entity
	 * @param {String} .tag The tag for the entity
	 * @param {Number} .id The entity ID
	 * @param {Transform} .transform The transform object
	 */
	var Entity = function (params) {
		this.label = params.label || "";
		this.tag = params.tag || "";
		this._id = params.id;
		this.transform = new Transform(params.transform || {});
	};
	Entity.prototype.getComponent = function (scene, componentType) {
		return scene.getComponentValue(componentType, this._id);
	};

	return Entity;
});