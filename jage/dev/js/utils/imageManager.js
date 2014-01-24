define ([], function () {
	var ImageManager = function () {
		this.images = {};
		this.baseFolder = "";
	};

	ImageManager.prototype.add = function (params) {
		for (var i in params) {
			this.addImage(params[i]);
		}
	};

	ImageManager.prototype.add = function (params) {
		var image = new Image();
		this.images = {
			image : image,
			loaded : false
		};
		var self = this;
		image.addEventListener('load', function (event) {
			self.images[params.name].loaded = true;
		});
		image.src = this.baseFolder  + params.src;
	};

	ImageManager.prototype.get = function (name) {
		if (this.images[name].loaded) {
			return this.images[name].image;
		}
	};


	return new ImageManager();
});