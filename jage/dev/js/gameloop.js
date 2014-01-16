define (['j.GameStates', 'j.sceneManager'], function (GameStates, sceneManager) {
	var state = GameStates.STOPPED;
	function loop () {
		inputs();
		preUpdate();
		update();
		postUpdate();
		preRender();
		render();
		postRender();
		window.requestAnimationFrame (loop);
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

	function init () {
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
		resume: resume
	};
});