define ([], function () {
	var Entity = function (label, id) {
		this.label = label || "";
		this._id = id;
	};

	return Entity;
});