/* Main scene class. This contains all entities, components and everything in the current scene */
define (['j.ES', 'underscore', 'j.systems', 'j.componentTypes', 'j.world', 'j.time',
 'j.camera', 'j.config'],
	function (ES, _, systems, componentTypes, world, time,
 camera, config) {
	var runInEditMode = [
		"preRender",
		"render",
		"postRender"
	];
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
		for (var i = 0; i < this.description.content.length; i++) {
			var entityDesc = this.description.content[i];
			var entity = this.createEntity({
				transform : entityDesc.transform,
				label : entityDesc.label,
				tag : entityDesc.tag
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

	Scene.prototype.pause = function () {

	};

	Scene.prototype.resume = function () {

	};

	// Launches an event function, IE inputs, preUpdate, render...
	Scene.prototype.launchEV = function (ev) {
		var works = false;
		if (config.engine.editing) {
			for (var r = 0; r < runInEditMode.length; r++) {
				if (runInEditMode[r] === ev) {
					works = true;
				}
			}
			if (!works) {
				return;
			}
		}
		if (typeof this.functionsUsed[ev] === "object") {
			for (var i = 0; i < this.functionsUsed[ev].length; i++) {
				var systemName = this.functionsUsed[ev][i];
				var system = systems[systemName];
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
		var works = false;
		if (config.engine.editing) {
			for (var r = 0; r < runInEditMode.length; r++) {
				if (runInEditMode[r] === ev) {
					works = true;
				}
			}
			if (!works) {
				return;
			}
		}
		if (typeof this.functionsUsed[ev] === "object") {
			for (var i = 0; i < this.functionsUsed[ev].length; i++) {
				var systemName = this.functionsUsed[ev][i];
				var system = systems[systemName];
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