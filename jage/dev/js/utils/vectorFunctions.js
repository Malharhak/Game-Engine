define (['j.Vector2'], function (Vector2) {
	var vec = {
		add : function (first, other) {
			return new Vector2(first.x + other.x, first.y + other.y);
		},
		sub : function (first, other) {
			return new Vector2(first.x - other.x, first.y - other.y);
		},
		scale : function (first, scalar) {
			return new Vector2(first.x * scalar, first.y * scalar);
		},
		length : function (first) {
			return Math.sqrt(first.x * first.x + first.y * first.y);
		},
		normalize : function (first) {
			var ln = vectorFunctions.length(first);
			return new Vector2(first.x / ln, first.y / ln);
		}
	};

	return vec;
});