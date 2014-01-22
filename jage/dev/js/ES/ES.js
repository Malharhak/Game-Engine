// Contains all the functions for managing entities, components and systems
define (['j.Entity', 'j.componentTypes', 'j.systems', "underscore"],
	function (Entity, componentTypes, systems, _) {
	/**
	@class ES
	*/
	var ES = function () {
		this.__l = "";
	};
	/** Registers a system in the list
	* @method registerSystem
	* @param {String} name The key name for the system
	* @param {System} obj The system object, which is a system with added functions
	*/
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

	/**
	* Adds a component type to the list
	* @method registerComponent
	* @param {String} name The name for this component type
	* @param {Class} The class that this component will instantiate on creation
	*/
	ES.prototype.registerComponent = function (name, klass) {
		componentTypes.registerComponent(name, klass);
		this.componentData[name] = {};
		this.componentCounters[name] = 0;
	};
	/**
	* Creates an entity
	*
	* @method createEntity
	* @param {String} label (optional) The label for this object (debug purposes)
	* @param {String} tag (optional) The tag for this object
	*/
	ES.prototype.createEntity = function (params) {
		if (typeof params !== "object") {
			params = {};
		}
		if (typeof params._id === "number") {
			if (params._id > this.entitiesCounter) {
				this.entitiesCounter = params._id;
			}
		} else {
			params._id = this.entitiesCounter;
		}
		this.entities[params._id] = new Entity(params);

		return this.entitiesCounter++;
	};

	/** Instantiates a component
	*
	* @method createComponent
	* @param {String} compType The type of component
	* @param {Object} values The values to set for this component (will be sent to class constructor)
	*/
	ES.prototype.createComponent = function (compType, values) {
		var component = new componentTypes[compType](values);
		if (typeof values !== "object") {
			values = {};
		}
		if (typeof values._id === "number") {
			component._id = values._id;
			if (values._id > this.componentCounters[compType]) {
				this.componentCounters[compType] = values._id;
			}
		} else {
			component._id = this.componentCounters[compType];
		}
		component._type = compType;
		this.componentData[compType][this.componentCounters[compType]] = component;
		return this.componentCounters[compType]++;
	};

	/**
	 * Adds a component to an entity
	 * @method  addComponentToEntity
	 * @param {Number} entityId
	 * @param {String} componentType
	 * @param {Number} componentId
	 */
	ES.prototype.addComponentToEntity = function (entityId, componentType, componentId) {
		if (typeof this.entityComponents[entityId] !== "object") {
			this.entityComponents[entityId] = {};
		}
		if (this.entityComponents[entityId][componentType] === undefined) {
			this.entityComponents[entityId][componentType] = [componentId];
		} else {
			this.entityComponents[entityId][componentType].push(componentId);
		}
		this.componentData[componentType][componentId]._entityId = entityId;
	};

	/**
	 * Creates a component and adds it to the entity
	 * @method  createComponentAndAddTo
	 * @param  {Number} entityId
	 * @param  {String} componentType
	 * @param  {Object} values
	 * @return {Number}
	 */
	ES.prototype.createComponentAndAddTo = function (entityId, componentType, values) {
		var componentId = this.createComponent(componentType, values);
		this.addComponentToEntity(entityId, componentType, componentId);
		return componentId;
	};
	/**
	 * Checks if an entity has a component type
	 * @method  hasComponent
	 * @param  {Number}  entityId
	 * @param  {String}  componentType
	 * @return {Boolean}
	 */
	ES.prototype.hasComponent = function (entityId, componentType) {
		return typeof this.entityComponents[entityId][componentType] === "object" ? true : false;
	};

	/**
	 * Returns the entity for a component
	 * @method  getEntityForComponent
	 * @param  {Component} component
	 * @return {Entity}
	 */
	ES.prototype.getEntityForComponent = function (component) {
		return this.entities[component._entityId];
	};

	/**
	 * Returns a component for a type and ID
	 * @method  getComponentValue
	 * @param  {String} componentType
	 * @param  {Number} componentId
	 * @return {Component}
	 */
	ES.prototype.getComponentValue = function (componentType, componentId) {
		return this.componentData[componentType][componentId];
	};

	/**
	 * Returns a component for a given entity
	 * @method  getComponentForEntity
	 * @param  {String} componentType
	 * @param  {Number} entityId
	 * @return {Component}
	 */
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

	/**
	 * Returns an entity for an ID
	 * @method  getEntity
	 * @param  {Number} entityId
	 * @return {Entity}
	 */
	ES.prototype.getEntity = function (entityId) {
		return this.entities[entityId];
	};

	/**
	 * Returns all the components of an array of types
	 * @method  findAllComponents
	 * @param  {[String]} componentTypes
	 * @return {ComponentData} An object containing all the data for each type
	 */
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

	/**
	 * Returns the entities for a components list
	 * @method  getEntitiesForComponents
	 * @param  {[String]} components
	 * @return {[Entity]}
	 */
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
	ES.prototype.getEntityWithComponents = function (entityId) {
		var res = {};
		res.entity  = this.entities[entityId];
		for (var i in this.entityComponents[entityId]) {
			res[i] = this.componentData[i][this.entityComponents[entityId][i][0]];
		}
		return res;
	};

	ES.prototype.getEntitiesWithComponents = function (components) {
		var res = {};
		for (var i in this.entityComponents) {
			var valid = true;
			for (var c = 0; c < components.length; c++) {
				if (!this.entityComponents[i].hasOwnProperty(components[c])) {
					valid = false;
					break;
				}
			}
			if (valid) {
				res[i] = {};
				res[i].entity = this.entities[i];
				for (var comp = 0; comp < components.length; comp++) {
					var compType = components[comp];
					res[i][compType] = this.getComponentForEntity(compType, this.entities[i]._id);
				}
			}
		}
		return res;
	};

	return ES;
});