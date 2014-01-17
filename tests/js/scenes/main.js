define (['j.Shapes'], function (Shapes) {
	return {
	name: 'main',
	worldProperties: {
		gravity: 9.8
	},
	content: [
			{
				"transform": {
					"x" : 3,
					"y" : 3,
					"angle" : 0.3
				},
				"components": {
					"renderer": {
						"width": 1.9,
						"height": 1.9,
						"color" : "orange"
					},
					"rigidbody": {
						"shape": Shapes.CIRCLE,
						"mass": 0.5,
						"properties": {
							"radius" : 1.5,
							"center": {
								"x" : 0,
								"y" : 0
							}
						}
					}
				}
			},

			{
				"transform": {
					"x": 8,
					"y": 4
				},
				"components": {
					"renderer": {
						"width": 0.9,
						"height": 0.9,
						"color" : "brown"
					},
					"rigidbody": {
						"shape": Shapes.CIRCLE,
						"mass": 0.2,
						"properties": {
							"radius" : 0.6,
							"center": {
								"x" : 0,
								"y" : 0
							}
						}
					}
				}
			},

			{
				"transform": {
					"x": 4,
					"y": 6,
					"angle": 0.6
				},
				"components": {
					"renderer": {
						"width": 0.5,
						"height": 0.5,
						"color" : "red",
						"pivot" : {
							"x" : 0.25,
							"y" : 0.25
						}
					},
					"rigidbody": {
						"shape": Shapes.BOX,
						"mass": 1,
						"properties": {
							"start" : {
								"x" : -0.3,
								"y" : -0.3
							},
							"end" : {
								"x" : 0.6,
								"y" : 0.6
							}
						}
					}
				}
			}
		]
	};
});