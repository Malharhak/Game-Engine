define (['underscore', 'j.Scene'], function (_, Scene) {
	var SceneManager = function () {
		this.sceneDescriptions = {};
		this.scenes = {};
		this.activeScene = "default";
	};
	SceneManager.prototype.registerScenes = function (scenes) {
		_.extend(this.sceneDescriptions, scenes);
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