define ([], function () {
	var circleCircle = function (circle1, circle2) {
		if (Math.abs(circle2.center.sub(circle1.center).length()) <= circle1.radius + circle2.radius) {
			return true;
		} else {
			return false;
		}
	};

	return circleCircle;
});