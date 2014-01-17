define ([], function () {
	return {
	name: 'main',
	content: [
			{
				"transform": {
					"x" : 200,
					"y" : 200
				},
				"components": {
					"renderer": {
						"width": 10,
						"height": 40,
						"color" : "blue"
					}
				}
			},
			{
				"transform": {
					"x": 20,
					"y": 100
				},
				"components": {
					"renderer": {
						"width": 5,
						"height": 10,
						"color" : "red"
					}
				}
			}
		]
	};
});