define (['j.GameStates', 'j.sceneManager', 'j.requestAnimFrame',
	'j.initJage', 'j.currentScene', 'j.time', 'jquery', 'j.config', 'dat.gui'
	], function (GameStates, sceneManager, requestAnimFrame,
		initJage, currentScene, time, $, config, dat
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
		time.pause();
	}
	function resume () {
		state = GameStates.RUNNING;
		time.resume();
	}

	function togglePause () {
			if (state === GameStates.PAUSED) {
				resume();
			} else {
				pause();
			}
	}
	$(window).on('keydown', function (event) {
		if (event.keyCode === 80) {
			togglePause();
		}
	});

	if (config.debug) {
		var lol = {
			pause : function () {
				togglePause();
			}
		};

		var gui = new dat.GUI();
		gui.add(time, 'timeScale', -2, 2);
		gui.add(config, 'debug');
		gui.add(lol, 'pause');
	}

	return {
		init: init,
		load: load,
		pause: pause,
		resume: resume,
		sceneManager: sceneManager,
		launchScene: launchScene,
		config: config,
		time: time
	};
});