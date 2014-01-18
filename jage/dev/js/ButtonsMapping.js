define(['j.GamepadButtons', 'j.KeyboardButtons'],
 function (gButtons, kButtons) {
	var ButtonsMapping = {
		FORWARD : [gButtons.UP, kButtons.UP],
		LEFT : [gButtons.LEFT, kButtons.LEFT],
		RIGHT : [gButtons.RIGHT, kButtons.RIGHT],
		BACKWARD : [gButtons.DOWN, kButtons.DOWN],
		JUMP : [gButtons.A, kButtons.SPACE]
	};

	return ButtonsMapping;
});