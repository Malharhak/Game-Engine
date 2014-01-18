define (['j.Renderer', 'j.Rigidbody', 'j.Inputable'],
 function (Renderer, Rigidbody, Inputable) {
	var defaultComponents = {
		"renderer" : Renderer,
		'rigidbody' : Rigidbody,
		'inputable' : Inputable
	};

	return defaultComponents;
});