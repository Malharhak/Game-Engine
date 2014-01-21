/* Main scene class. This contains all entities, components and everything in the current scene */
define (['j.ES', 'underscore', 'j.systems', 'j.componentTypes', 'j.world', 'j.time',
 'j.camera', 'j.config'],
	function (ES, _, systems, componentTypes, world, time,
 camera, config) {

	var Scene = function (description) {
		this.description = description;
		this.name = description.name;
		this.entitiesCounter = 0;
		this.entities = {};
		this.componentData = {};
		this.componentCounters = {};
		this.entityComponents = {};
		this.functionsUsed = {};
	};
	_.extend(Scene.prototype, ES.prototype);

	Scene.prototype.init = function (callback) {
		for (var i in componentTypes) {
			this.componentData[i] = {};
			this.componentCounters[i] = 0;
		}
		for (var s in systems) {
			for (var f in systems[s]) {
				if (typeof systems[s][f] === "function") {
					if (typeof this.functionsUsed[f] === "object") {
						this.functionsUsed[f].push(s);
					} else {
						this.functionsUsed[f] = [s];
					}
				}
			}
		}
		callback();
	};

	Scene.prototype.load = function (callback) {
		world.setProperties(this.description.worldProperties);
		for (var i in this.description.content) {
			var entityDesc = this.description.content[i];
			var entity = this.createEntity({
				transform : entityDesc.transform,
				label : entityDesc.label,
				tag : entityDesc.tag,
				_id : entityDesc._id
			});
			for (var c in entityDesc.components) {
				var compType = c;
				var values = entityDesc.components[c];
				this.createComponentAndAddTo(entity, compType, values);
			}
		}
		time.start();
		camera.load(this.description.camera);
		this.launchEV('start');
		callback();
	};

	Scene.prototype._export = function () {
		var sceneDesc = {
			worldProperties: {
				gravity : world.gravity
			},
			camera : {
				position : camera.position
			},
			content : {}
		};
		for (var d in this.entityComponents) {
			var entity = this.entities[d];
			sceneDesc.content[d] = {};
			_.extend(sceneDesc.content[d], entity);
			sceneDesc.content[d].components = {};
			var comps = sceneDesc.content[d].components;
			for (var c in this.entityComponents[d]) {
				var componentId = this.entityComponents[d][c][0];
				var component = this.componentData[c][componentId];
				if (typeof component.getProperties === "function") {
					comps[c] = component.getProperties();
				} else {
					comps[c] = _.extend({}, component);
				}
			}
		}
		return JSON.stringify(sceneDesc);
	};

	Scene.prototype.pause = function () {

	};

	Scene.prototype.resume = function () {

	};


	Scene.prototype.checkEditMode = function (ev, system) {
		if (!config.engine.editing) {
			return true;
		}
		if (typeof system.executeInEditMode !== undefined && system.executeInEditMode !== false) {
			if (typeof system.executeInEditMode === "boolean") {
				return true;
			} else if (typeof system.executeInEditMode === "object") {
				for (var i = 0; i < system.executeInEditMode.length; i++) {
					if (system.executeInEditMode[i] === ev) {
						return true;
					}
				}
				return false;
			}
		} else {
			return false;
		}
	};
	// Launches an event function, IE inputs, preUpdate, render...
	Scene.prototype.launchEV = function (ev) {

		if (typeof this.functionsUsed[ev] === "object") {
			for (var i = 0; i < this.functionsUsed[ev].length; i++) {
				var systemName = this.functionsUsed[ev][i];
				var system = systems[systemName];
				if (!this.checkEditMode(ev, system)) {
					return;
				}
				if (system.globalSystem || system.masterSystem) {
					system[ev](this);
				} else {
					var comps = this.getEntitiesForComponents(system.usedComponents);
					for (var c = 0; c < comps.length; c++) {
						system[ev](this, comps[c]);
					}
				}
			}
		}

	};

	Scene.prototype.entityEvent = function (ev, entity, params) {
		if (typeof this.functionsUsed[ev] === "object") {
			for (var i = 0; i < this.functionsUsed[ev].length; i++) {
				var systemName = this.functionsUsed[ev][i];
				var system = systems[systemName];
				if (!this.checkEditMode(ev, system)) {
					return;
				}
				var valid = true;
				for (var c = 0; c < system.usedComponents; c++) {
					if (!this.hasComponent(entity._id, system.usedComponents[c])) {
						valid = false;
						break;
					}
				}
				if (valid) {
					system[ev](this, entity, params);
				}
			}
		}
	};
	return Scene;
});