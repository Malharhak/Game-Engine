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
		this._id = params._id;
		this.transform = new Transform(params.transform || {});
	};
	Entity.prototype.getComponent = function (scene, componentType) {
		return scene.getComponentValue(componentType, this._id);
	};

	Entity.prototype.getProperties = function (gui) {
		console.log(gui);
		var ent = gui.addFolder('entity');
		console.log(ent);
		var self = this;
		ent.add(self, 'label');
		ent.add(self, 'tag');
		var tr = ent.addFolder('transform');
		this.transform.getProperties(tr);
	};
	return Entity;
});