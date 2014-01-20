define([], function () {
	var aabb = function (a, b) {
		if (a.start.x + a.end.x < b.start.x ||
			b.start.x + b.end.x < a.start.x ||
			a.start.y + a.end.y < b.start.y ||
			b.start.y + b.end.y < a.start.y) {
			return false;
		} else {
			return true;
		}
	};

	return aabb;
});