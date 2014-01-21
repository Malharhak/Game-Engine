define (['underscore', 'j.Scene', 'j.currentScene', 'j.emptyScene', 'j.systems',
 'j.config'],
	function (_, Scene, currentScene, emptyScene, systems,
 config) {
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
	SceneManager.prototype.registerSystem = function (name, obj) {
		systems.registerSystem(name, obj);
	};

	SceneManager.prototype.changeScene = function (scene, callback) {
		this.loadScene(scene, callback);
	};

	SceneManager.prototype._toggleEdit = function () {
		if (config.engine.editing) {
			this._playMode();
		} else {
			this._editMode();
		}
	};

	SceneManager.prototype._playMode = function ()  {
		config.engine.editing = false;
		this.editingDescription = JSON.parse(this.activeScene._export());
		var  self = this;
		this.changeScene('empty', function () {
			self.registerScene(self.editingDescription.name, self.editingDescription);
			self.changeScene(self.editingDescription.name, function () {});
		});
	};

	SceneManager.prototype._editMode = function () {
		config.engine.editing = true;
		var self = this;
		this.changeScene('empty', function () {
			self.registerScene(self.editingDescription.name, self.editingDescription);
			self.changeScene (self.editingDescription.name, function () {});
		});
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