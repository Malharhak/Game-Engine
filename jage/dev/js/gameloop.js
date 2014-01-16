define (['j.GameStates', 'j.sceneManager', 'j.requestAnimFrame',
	'j.initJage'
	], function (GameStates, sceneManager, requestAnimFrame,
		initJage
		) {
	var state = GameStates.STOPPED;
	function loop () {
		if (state === GameStates.RUNNING) {
			inputs();
			preUpdate();
			update();
			postUpdate();
			preRender();
			render();
			postRender();
		}
		requestAnimFrame(loop);
	}
	function inputs() {
		sceneManager.activeScene.launchEV('inputs');
	}
	function preUpdate() {
		sceneManager.activeScene.launchEV('preUpdate');
	}
	function update() {
		sceneManager.activeScene.launchEV('update');
	}
	function postUpdate() {
		sceneManager.activeScene.launchEV('postUpdate');
	}
	function preRender() {
		sceneManager.activeScene.launchEV('preRender');
	}
	function render() {
		sceneManager.activeScene.launchEV('render');
	}
	function postRender () {
		sceneManager.activeScene.launchEV('postRender');
	}

	function init (options) {
		initJage(options);
		loop();
		state = GameStates.LOADING;
		load();
	}
	function load () {
		state = GameStates.RUNNING;
	}
	function pause () {
		state = GameStates.PAUSED;
	}
	function resume () {
		state = GameStates.RUNNING;
	}

	return {
		init: init,
		load: load,
		pause: pause,
		resume: resume,
		sceneManager: sceneManager
	};
});