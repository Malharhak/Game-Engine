/* Main scene class. This contains all entities, components and everything in the current scene */
define (['j.ES', 'underscore'], function (ES, _) {
	var Scene = function (description) {
		this.entitiesCounter = 0;
		this.componentsCounter = 0;
		this.entities = {};
		this.componentTypes = {};
		this.componentData = {};
		this.componentCounters = {};
		this.entityComponents = {};
		this.systems = {};
		this.functionsUsed = {};
	};
	_.extend(Scene, ES);

	Scene.prototype.init = function (callback) {
		callback();
	};

	Scene.prototype.load = function (callback) {
		callback();
	};

	Scene.prototype.pause = function () {

	};

	Scene.prototype.resume = function () {

	};

	// Launches an event function, IE inputs, preUpdate, render...
	Scene.prototype.launchEV = function (ev) {
		if (this.functionsUsed[ev] !== undefined) {
			for (var i = 0; i < this.functionsUsed[ev].length; i++) {
				var system = this.systems[this.functionsUsed[ev][i]];
				var comps = this.findAllComponents(system.usedComponents);
				if (system.globalSystem) {
					var nComps = this.systems[i][ev](comps);
					this.setComponents(nComps);
				} else {
					for (var c = 0; c < comps.length; i++) {
						var nComp = this.systems[i][ev](comps[c]);
						this.setComponent(nComp);
					}
				}
			}
		}
	};

	return Scene;
});