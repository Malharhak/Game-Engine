/* System class: The user can define a system that uses some components and implements some functions. */
define ([], function () {
	// usedComponents is an array with the name of the components used
	var System = function (params) {
		this.masterSystem = params.masterSystem || false;
		this.usedComponents = params.usedComponents || [];
		this.globalSystem = params.globalSystem || false; // If global system, will receive all components at once
		this.executeInEditMode = params.executeInEditMode || false;
		this.onlyEditMode = params.onlyEditMode || false;
	};

	return System;
});