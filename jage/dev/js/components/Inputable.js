define ([], function () {
	var Inputable = function (params) {
		if (typeof params === "undefined") {
			params =  {};
		}
		this.inputId = params.inputId || 0;
	};

	return Inputable;
});