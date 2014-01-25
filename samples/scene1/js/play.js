define (['j.main', 'j.componentTypes', 'scenes/main', 'j.sceneManager',
	'components/Player', 'systems/playerSystem', 'j.systems', 'j.componentTypes',
 'playConfig'],
function (j, componentTypes, mainScene, sceneManager,
	player, playerSystem, systems, componentTypes, config) {

	// This is the first entry point for Jage
	jage.init(config, function () {

		// We first register our basic scene into the engine
		sceneManager.registerScene('main', JSON.parse(mainScene));

		// Then we can register our different component/systems
		systems.registerSystem('playerSystem', playerSystem);
		componentTypes.registerComponent('player', player);

		// Now we can launch our main game scene.
		jage.launchScene('main', function () {
			console.log("what's up");
		});
	});
});