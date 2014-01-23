define (['j.GameStates', 'j.sceneManager', 'j.requestAnimFrame',
	'j.initJage', 'j.currentScene', 'j.time', 'jquery', 'j.config', 'dat.gui', 'j.camera',
	'j.inputs', 'j.systems', 'j.pageVisibility', 'j.editGui'
	], function (GameStates, sceneManager, requestAnimFrame,
		initJage, currentScene, time, $, config, dat, camera,
		inputsMan, systems, pageVisibility, editGui
		) {
	var state = GameStates.STOPPED;
	function loop () {
		if (state === GameStates.RUNNING) {
			preInputs();
			inputs();
			inputsMan.postInputs();
			postInputs();
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
	function preInputs () {
		sceneManager.activeScene.launchEV('preInputs');
	}
	function inputs() {
		sceneManager.activeScene.launchEV('inputs');
	}
	function postInputs () {
		sceneManager.activeScene.launchEV ('postInputs');
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
		sceneManager.activeScene.launchEV('pause');
	}
	function resume () {
		state = GameStates.RUNNING;
		time.resume();
		sceneManager.activeScene.launchEV('resume');
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
	pageVisibility.onHide(function () {
		pause();
	});
	pageVisibility.onVisible(function () {
		resume();
	});

	if (config.engine.debug) {
		var lol = {
			pause : function () {
				togglePause();
			},
			toggleEdit : function () {
				state = GameStates.LOADINGSCENE;
				sceneManager._toggleEdit(function () {
					state = GameStates.RUNNING;
				});
			}
		};
		var toolsFuncs = {
			createEntity : function () {
				sceneManager.activeScene.createDefaultEntity({transform :{
					position : camera.position
				}});
			}
		};

		editGui.config.add(time, 'timeScale', -2, 2);
		editGui.config.add(config, 'debug');
		editGui.config.add(lol, 'pause');
		if (config.engine.editing) {
			editGui.config.add(lol, 'toggleEdit');
		}
		editGui.tools.add(toolsFuncs, 'createEntity');
	}

	return {
		init: init,
		load: load,
		pause: pause,
		resume: resume,
		sceneManager: sceneManager,
		launchScene: launchScene,
		config: config,
		time: time,
		camera: camera,
		inputs : inputsMan,
		systems : systems
	};
});