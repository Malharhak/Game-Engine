/* System class: The user can define a system that uses some components and implements some functions. */
define ([], function () {
	// usedComponents is an array with the name of the components used
	var System = function (usedComponents, globalSystem) {
		this.usedComponents = usedComponents;
		this.globalSystem = false; // If global system, will receive all components at once
	};

	return System;
});