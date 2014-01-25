define(['j.images'], function (images) {

	var assetManagers = {
		"image" : images
	};

	var AssetsManager = function () {
		this.assets = {};
	};

	AssetsManager.prototype.addAsset = function (assetType, asset) {

		assetManagers[assetType].add(asset);
	};

	AssetsManager.prototype.get = function (assetType, asset) {
		return assetsManager[assetType].get(asset);
	};

	return new AssetsManager();
});