define(['j.Shapes', 'j.Box', 'j.Circle', 'j.Vector2'],
 function (Shapes, Box, Circle, Vector2) {

	var shapes = {};
	shapes[Shapes.CIRCLE] = Circle;
	shapes[Shapes.BOX] = Box;
	var Renderer = function (params) {
		if (typeof params !== "object") {
			params = {

			};
		}
		this.color = params.color || "blue";
		this.shape = params.shape || 0;
		_.extend(this, new shapes[this.shape](params.properties));
		this.pivot = new Vector2(params.pivot);
	};

	return Renderer;
});