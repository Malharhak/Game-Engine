define (['j.renderingSystem', 'j.physicsSystem', 'j.screenSystem'], function (renderingSystem, physicsSystem, screenSystem) {
	var defaultSystems = {
		'j.screen' : screenSystem,
		'j.rendering' : renderingSystem,
		'j.physics' : physicsSystem
	};

	return defaultSystems;
});