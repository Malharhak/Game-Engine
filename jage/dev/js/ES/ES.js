define (['j.Entity', 'j.Component'], function (Entity, Component) {
	var ES = function () {

	};

	ES.prototype.registerSystem = function (name, obj) {
		this.systens[name].push(obj);
		for (var i in obj) {
			if (typeof i === "function") {
				this.addFunctionsUsed(i, name);
			}
		}
	};
	ES.prototype.addFunctionsUsed = function (i, name) {
		if (this.functionsUsed[i] !== undefined) {
			this.functionsUsed[i] = [name];
		} else {
			this.functionsUsed[i].push(name);
		}
	};

	ES.prototype.registerComponent = function (name, klass) {
		this.componentTypes[name] = klass;
		this.componentData[name] = {};
		this.componentCounters[name] = 0;
	};
	ES.prototye.createEntity = function (label) {
		this.entities[this.entitiesCounter] = new Entity(label, this.entitiesCounter);
		return this.entitiesCounter++;
	};
	ES.prototype.createComponent = function (compType, values) {
		var component = new this.componentTypes[compType](values);
		component._id = this.componentCounters[compType];
		component._type = compType;
		this.componentData[compType][this.componentCounters[compType]] = component;
		return this.componentCounters[compType]++;
	};
	ES.prototype.addComponentToEntity = function (entityId, componentType, componentId) {
		if (typeof this.entityComponents[entityId] !== "object") {
			this.entityComponents[entityId] = {};
		}
		if (this.entityComponents[entityId][componentType] === undefined) {
			this.entityComponents[entityId][componentType] = [componentId];
		} else {
			this.entityComponents[entityId][componentType].push(componentId);
		}
	};
	ES.prototype.createComponentAndAddTo = function (entityId, componentType, values) {
		var componentId = this.createComponent(componentType, values);
		this.addComponentToEntity(entityId, componentType, componentId);
		return componentId;
	};

	ES.prototype.getComponentValue = function (componentType, componentId) {
		return _.clone(this.componentData[componentType][componentId]);
	};
	ES.prototype.findAllComponents = function (componentTypes) {
		var res = {};
		for (var i = 0; i < componentTypes.length; i++) {
			res[componentTypes[i]] = this.componentData[componentTypes[i]];
		}
		return res;
	};
	ES.prototype.setComponent = function (component) {
		this.componentData[component._type][component._id] = component;
	};
	ES.prototype.setComponents = function (components) {
		for (var i = 0; i < components.length; i++) {
			this.setComponent(components[i]);
		}
	};

	return ES;
});