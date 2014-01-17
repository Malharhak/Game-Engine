define (['j.GameStates', 'j.sceneManager', 'j.requestAnimFrame',
	'j.initJage', 'j.currentScene', 'j.time'
	], function (GameStates, sceneManager, requestAnimFrame,
		initJage, currentScene, time
		) {
	var state = GameStates.STOPPED;
	function loop () {
		if (state === GameStates.RUNNING) {
			inputs();
			time.preUpdate();
			preUpdate();
			update();
			postUpdate();
			time.postUpdate();
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
	function launchScene (name, callback) {
		state = GameStates.LOADINGSCENE;
		sceneManager.changeScene(name, function () {
			if (typeof callback === "function") {
				state = GameStates.RUNNING;
				callback();
			}
		});
	}
	function init (options, callback) {
		initJage(options, function () {
			loop();

			state = GameStates.LOADING;
			load(options, callback);
		});
	}
	function load (options, callback) {
		state = GameStates.RUNNING;
		if (typeof callback === "function") {
			callback();
		}
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
		sceneManager: sceneManager,
		launchScene: launchScene
	};
});