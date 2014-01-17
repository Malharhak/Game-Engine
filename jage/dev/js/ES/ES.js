define (['j.Entity', 'j.componentTypes', 'j.systems', "underscore"],
	function (Entity, componentTypes, systems, _) {
	var ES = function () {
		this.__l = "";
	};
	ES.prototype.registerSystem = function (name, obj) {
		systems.registerSystem(name, obj);
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
		componentTypes.registerComponent(name, klass);
		this.componentData[name] = {};
		this.componentCounters[name] = 0;
	};
	ES.prototype.createEntity = function (params) {
		if (typeof params !== "object") {
			params = {};
		}
		params.id = this.entitiesCounter;
		this.entities[this.entitiesCounter] = new Entity(params);

		return this.entitiesCounter++;
	};
	ES.prototype.createComponent = function (compType, values) {
		var component = new componentTypes[compType](values);
		component._id = this.componentCounters[compType];
		component._type = compType;
		_.extend(component, values);
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
		return this.componentData[componentType][componentId];
	};
	ES.prototype.getComponentForEntity = function (componentType, entityId) {
		var dataIds = this.entityComponents[entityId][componentType];
		if (dataIds.length === 1) {
			return this.getComponentValue(componentType, dataIds[0]);
		} else if (dataIds.length === 0){
			return false;
		}
		var res = [];
		for (var i = 0; i < dataIds.length; i++) {
			res.push(this.getComponentValue(componentType, dataIds[i]));
		}
		return res;
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

	ES.prototype.getEntitiesForComponents = function (components) {
		var res = [];
		for (var i in this.entityComponents) {
			var valid = true;
			for (var c = 0; c < components.length; c++) {
				if (!this.entityComponents[i].hasOwnProperty(components[c])) {
					valid = false;
					break;
				}
			}
			if (valid) {
				res.push(this.entities[i]);
			}
		}
		return res;
	};

	return ES;
});