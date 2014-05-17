/* Main scene class. This contains all entities, components and everything in the current scene */
define (['j.ES', 'underscore', 'j.systems', 'j.componentTypes', 'j.world', 'j.time',
 'j.camera', 'j.config'],
	function (ES, _, systems, componentTypes, world, time,
 camera, config) {

	/*
		The Scene contains all the game's data for a level. Entities, components and systems are stored in it
	*/
	var Scene = function (description) {
		// Contains all the data for this scene (entities, components, physics properties..)
		// TODO: This should definitely be a class too, would help to avoid differeneces between scene loading and unloading
		this.description = description;
		// The name is used for reference when loading a scene
		this.name = description.name;

		// These are the data holder. Everything is associated to an id and retrieved with it
		// TODO: Shouldn't these actually be classes so it's easier to see their structure?
		this.entities = {}; // Contains every entity stored by id
		this.componentData = {}; // Contains another object for each type of component, which contains the components themselves, referenced by id
		this.entityComponents = {}; // Contains a list of components and their id for each entity
		
		// Counters for assigning ids to entities and components
		this.entitiesCounter = 0;
		this.componentCounters = {}; // One counter per component type
		
		// TODO: Should be a class too?
		this.functionsUsed = {}; // Holds the system's functions - An array per function name containing the system's functions that implement them
	};

	// To avoid having all in one file, the Scene class is extended by the ES class, providing utilitary functions
	_.extend(Scene.prototype, ES.prototype);

	// Initialized the data for a scene before filling it
	Scene.prototype.init = function (callback) {
		// Prepares the component id counters (one per component type)
		for (var i in componentTypes) {
			this.componentData[i] = {};
			this.componentCounters[i] = 0;
		}
		// Stores systems in the list of functions used. That seems really inefficient
		// TODO: Find a better way to store reference to systems
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

	// Fills the scene data with the properties in the scene description
	Scene.prototype.load = function (callback) {
		// Initializes general properties (gravity and stuff)
		world.setProperties(this.description.worldProperties);

		// Actual content of the scene - entities and their components
		for (var i in this.description.content) {
			var entityDesc = this.description.content[i];
			// Creates the current entity
			var entity = this.createEntity({
				transform : entityDesc.transform,
				label : entityDesc.label,
				tag : entityDesc.tag,
				_id : entityDesc._id // I find it weird that ids are stored in the scene file
			});
			// for each of its components, create the component and associate it with the entity
			for (var c in entityDesc.components) {
				var compType = c;
				var values = entityDesc.components[c];
				var cmp = this.createComponentAndAddTo(entity, compType, values);
			}
		}
		// Start stuff
		time.start();
		camera.load(this.description.camera);
		// Calls the start function
		/* TODO: The start function should be called once per entity-component pair, 
			and it could also be called later so it should actually be called per-component... */
		this.launchEV('start');
		callback();
	};

	// Exports the scene in json format. Basically recreates the scene description. For exporting data from the game visual editor
	Scene.prototype._export = function () {
		// Basic properties
		var sceneDesc = {
			worldProperties: {
				gravity : world.gravity
			},
			camera : {
				position : camera.position
			},
			content : {}
		};
		// Loop through everything and get all that in a nice object.
		for (var d in this.entityComponents) {
			var entity = this.entities[d];
			sceneDesc.content[d] = {};
			_.extend(sceneDesc.content[d], entity);
			sceneDesc.content[d].components = {};
			var comps = sceneDesc.content[d].components;
			for (var c in this.entityComponents[d]) {
				var componentId = this.entityComponents[d][c][0];
				var component = this.componentData[c][componentId];
				if (typeof component.export === "function") {
					comps[c] = component.export();
				} else {
					comps[c] = _.extend({}, component);
				}
			}
		}
		// TODO: How to beautify the json string so that it could be stored in a file and versionned by git?
		// Seriously scene versioning is important
		// By the way some sort of node server for the editor that could read/write files would be useful
		return JSON.stringify(sceneDesc);
	};

	// Not implemeted yet.
	Scene.prototype.pause = function () {

	};

	Scene.prototype.resume = function () {

	};

/*  -- Ugly functions start
	Basically, these are the functions called by the gameloop and other game events
	They take an event, find the systems that need to be called, and call them with some data if needed */
	
	//  Checks for events that are also be called in edit mode (like the rendering)
	// We look at the system executeInEditMode property to see if the current event should be called
	Scene.prototype.checkEditMode = function (ev, system) {
		if (!config.engine.editing) {
			return true; // If we're not editing, return true anyway
		}
		// If not editing, check the system property
		if (typeof system.executeInEditMode !== undefined && system.executeInEditMode !== false) {
			// If its a boolean, every function is called in edit mode
			if (typeof system.executeInEditMode === "boolean") {
				return true; 
			}
			// If it's an array, loop and see if the current event is in it
			else if (typeof system.executeInEditMode === "object") {
				for (var i = 0; i < system.executeInEditMode.length; i++) {
					if (system.executeInEditMode[i] === ev) {
						return true;
					}
				}
				// If the event name is not found, don't call the event
				return false;
			}
		} else {
			return false;
		}
	};

	// Checks for an event that should be called ONLY in edit mode (like the editor functions)
	Scene.prototype.checkOnlyEditMode = function (ev, system) {
		if (typeof system.onlyEditMode === undefined || system.onlyEditMode === false) {
			return true; // If not specified in the system, then the function can be called

		} else {
			if (typeof system.onlyEditMode === "object") {
				// Loop through the array of functions to look for our one
				for (var i = 0; i < system.onlyEditMode.length; i++) {
					if (system.onlyEditMode[i] === ev) {
						return config.engine.editing; // If editing, we can call the function
					}
				}
			} 
			// If it's a boolean then call the function only in edit mode
			else {
				return config.engine.editing;
			}
		}
	};

	// Launches an event function, like update, render, animate, inputs...
	Scene.prototype.launchEV = function (ev) {

		if (typeof this.functionsUsed[ev] === "object") {
			for (var i = 0; i < this.functionsUsed[ev].length; i++) {
				var systemName = this.functionsUsed[ev][i];
				var system = systems[systemName];
				if (!this.checkEditMode(ev, system) || !this.checkOnlyEditMode(ev, system)) {
					continue;
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
				if (!this.checkEditMode(ev, system) || !this.checkOnlyEditMode(ev, system)) {
					continue;
				}
				if (entity !== false) {
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
				} else {
					system[ev](this, false);
				}
			}
		}
	};
	return Scene;
});