define([], function () {
	var RenderingModes = {
		EXTEND : 0, // Automatically sets the camera and canvas to the container's size
		FIXED : 1 // Keeps a fixed size for the camera and canvas
	};

	return RenderingModes;
});