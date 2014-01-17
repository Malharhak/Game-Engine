define([], function () {
	var aabb = function (a, b) {
		if ((a.start.x >= b.start.x && a.end.x + a.start.x <= b.end.x + b.start.x) || (b.start.x >= a.start.x && b.end.x + b.start.x <= a.end.x + a.start.x)) {
			if ((a.start.y >= b.start.y && a.end.y + a.start.y <= b.end.y + b.start.y) || (b.start.y >= a.start.y && b.end.y + b.start.y <= a.end.y + a.start.y)) {
				return true;
			}
		}
		return false;
	};

	return aabb;
});