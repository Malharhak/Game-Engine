define (['underscore', 'j.Scene', 'j.currentScene', 'j.emptyScene'],
	function (_, Scene, currentScene, emptyScene) {
	var SceneManager = function () {
		this.sceneDescriptions = {};
		this.scenes = {};
		this.activeScene = new Scene(emptyScene);
	};
	SceneManager.prototype.registerScenes = function (scenes) {
		_.extend(this.sceneDescriptions, scenes);
	};
	SceneManager.prototype.registerScene = function (name, scene) {
		this.sceneDescriptions[name] = scene;
	};

	SceneManager.prototype.changeScene = function (scene, callback) {
		this.loadScene(scene, callback);
	};

	SceneManager.prototype.loadScene = function (scene, callback) {
		this.scenes[scene] = new Scene (this.sceneDescriptions[scene]);
		this.lastScene = this.activeScene;
		var self = this;
		this.scenes[scene].init(function () {
			self.scenes[scene].load (function () {
				self.activeScene = self.scenes[scene];
				callback();
			});
		});
	};
	return new SceneManager();
});