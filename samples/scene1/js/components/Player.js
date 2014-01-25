define ([], function () {
	var Player = function (params) {
		if (typeof params !== "object") {
			params =  {};
		}
		this.name = params.name || "Link";
	};

	return Player;
});