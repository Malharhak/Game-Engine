define ([], function () {
	var GameStates = {
		STOPPED: 0,
		LOADING: 1,
		LOADINGSCENE: 2,
		RUNNING: 3,
		PAUSED: 4
	};

	return GameStates;
});