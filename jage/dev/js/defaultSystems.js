define (['j.renderingSystem', 'j.physicsSystem', 'j.screenSystem', 'j.mouseSystem',
 'j.editorSystem'],
 function (renderingSystem, physicsSystem, screenSystem, mouseSystem,
 editorSystem) {
	var defaultSystems = {
		'j.screen' : screenSystem,
		'j.rendering' : renderingSystem,
		'j.physics' : physicsSystem,
		'j.mouseSystem' : mouseSystem,
		'j.editorSystem' : editorSystem
	};

	return defaultSystems;
});