define(['j.Shapes', 'j.Box', 'j.Circle', 'j.Vector2', 'j.editGui'],
 function (Shapes, Box, Circle, Vector2, editGui) {

	var shapes = {};
	shapes[Shapes.CIRCLE] = Circle;
	shapes[Shapes.BOX] = Box;
	var Renderer = function (params) {
		if (typeof params !== "object") {
			params = {

			};
		}
		this.color = params.color || "#0000ff";
		this.shape = params.shape || 0;
		this.properties = new shapes[this.shape](params.properties);
		this.pivot = new Vector2(params.pivot);
	};

	Renderer.prototype.getProperties = function (gui) {
		var rnd = gui.addFolder('renderer');
		rnd.addColor(this, 'color');
		var shapeChange = rnd.add(this, 'shape', { Circle : 0, Box : 1});
		var pivot = rnd.addFolder('pivot');
		this.pivot.getProperties(pivot);
		var self = this;
		var props = rnd.addFolder('properties');
		this.properties.getProperties(props);
		shapeChange.onChange (function (value) {
			console.log(value);
			self.shape = parseInt(value, 10);
			self.properties = new shapes[self.shape]({});
			console.log(self);
			editGui.removeFolder(rnd, 'properties');
			props = rnd.addFolder('properties');
			self.properties.getProperties(props);
		});
	};

	Renderer.prototype.export = function () {
		return {
			color : this.color,
			shape : this.shape,
			pivot : this.pivot,
			properties : this.properties
		};
	};

	return Renderer;
});