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
		delete this.sceneDescriptions[name];
		this.sceneDescriptions[name] = scene;
	};
	SceneManager.prototype.registerSystem = function (name, obj) {
		systems.registerSystem(name, obj);
	};

	SceneManager.prototype.changeScene = function (scene, callback) {
		this.loadScene(scene, callback);
	};

	SceneManager.prototype._toggleEdit = function (callback) {
		if (config.engine.editing) {
			this._playMode(callback);
		} else {
			this._editMode(callback);
		}
	};

	SceneManager.prototype._playMode = function (callback)  {
		config.engine.editing = false;
		this.editingDescription = _.extend(this.activeScene.description, JSON.parse(this.activeScene._export()));
		var  self = this;
		this.changeScene('empty', function () {
			self.registerScene(self.editingDescription.name, self.editingDescription);
			self.changeScene(self.editingDescription.name, callback);
		});
	};

	SceneManager.prototype._editMode = function (callback) {
		config.engine.editing = true;
		var self = this;
		this.changeScene('empty', function () {
			self.registerScene(self.editingDescription.name, self.editingDescription);
			self.changeScene (self.editingDescription.name, callback);
		});
	};
	SceneManager.prototype.loadScene = function (scene, callback) {
		delete this.scenes[scene];
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