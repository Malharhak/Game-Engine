define (['j.Shapes'], function (Shapes) {
	return {
	name: 'main',
	worldProperties: {
		gravity: 9.8
	},
	content: [
			{
				"transform": {
					"x" : 200,
					"y" : 200
				},
				"components": {
					"renderer": {
						"width": 50,
						"height": 50,
						"color" : "blue"
					},
					"rigidbody": {
						"shape": Shapes.CIRCLE,
						"properties": {
							"radius" : 50,
							"center": {
								"x" : 25,
								"y" : 25
							}
						}
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
						"width": 100,
						"height": 100,
						"color" : "red"
					},
					"rigidbody": {
						"shape": Shapes.CIRCLE,
						"properties": {
							"radius" : 100,
							"center": {
								"x" : 50,
								"y" : 50
							}
						}
					}
				}
			},

			{
				"transform": {
					"x": 400,
					"y": 200
				},
				"components": {
					"renderer": {
						"width": 50,
						"height": 50,
						"color" : "red"
					},
					"rigidbody": {
						"shape": Shapes.BOX,
						"properties": {
							"start" : {
								"x" : -10,
								"y" : -10
							},
							"end" : {
								"x" : 70,
								"y" : 70
							}
						}
					}
				}
			}
		]
	};
});