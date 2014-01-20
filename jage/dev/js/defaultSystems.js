define (['j.renderingSystem', 'j.physicsSystem', 'j.screenSystem', 'j.mouseSystem'],
 function (renderingSystem, physicsSystem, screenSystem, mouseSystem) {
	var defaultSystems = {
		'j.screen' : screenSystem,
		'j.rendering' : renderingSystem,
		'j.physics' : physicsSystem,
		'j.mouseSystem' : mouseSystem
	};

	return defaultSystems;
});