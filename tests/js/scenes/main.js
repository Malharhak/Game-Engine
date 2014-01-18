define (['j.Shapes'], function (Shapes) {
	return {
	name: 'main',
	worldProperties: {
		gravity: 9.8
	},
	content: [
			{
				"transform": {
					"position": {
						"x" : 3,
						"y" : 3
					},
					"angle" : 0.3
				},
				"components": {
					"renderer": {
						"shape" : Shapes.CIRCLE,
						"properties": {
							"center": {
								"x" : 0,
								"y" : 0
							},
							"radius" : 1
						},
						"color" : "orange"
					},
					"rigidbody": {
						"shape": Shapes.CIRCLE,
						"mass": 2,
						"bouncy": 0.2,
						"properties": {
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
					"position": {
						"x": 8,
						"y": 4
					}
				},
				"components": {
					"renderer": {
						"shape": Shapes.BOX,
						"properties": {
							"start" : {
								"x" : -1,
								"y" : -0.5
							},
							"end" : {
								"x" : 2,
								"y" : 1
							}
						},
						"color" : "brown"
					},
					"rigidbody": {
						"shape": Shapes.BOX,
						"mass": 1,
						"bouncy": 0.5,
						"properties": {
							"start" : {
								"x" : -1,
								"y" : -0.5
							},
							"end" : {
								"x" : 2,
								"y" : 1
							}
						}
					}
				}
			},

			{
				"transform": {
					"position": {
						"x": 5,
						"y": 6
					},
					"angle": 0.6
				},
				"components": {
					"renderer": {
						"shape" : Shapes.BOX,
						"properties" : {
							"start" : {
								"x" : -0.25,
								"y" : -0.25
							},
							"end": {
								"x" : 0.5,
								"y" : 0.5
							}
						},
						"color" : "red"
					},
					"rigidbody": {
						"shape": Shapes.BOX,
						"mass": 0.5,
						"bouncy": 0.8,
						"properties": {
							"start" : {
								"x" : -0.25,
								"y" : -0.25
							},
							"end" : {
								"x" : 0.5,
								"y" : 0.5
							}
						}
					}
				}
			},

			{
				"transform": {
					"position": {
						"x": 11,
						"y": 5
					},
					"angle": 0
				},
				"components": {
					"renderer": {
						"shape" : Shapes.BOX,
						"properties" : {
							"start" : {
								"x" : -0.5,
								"y" : -1
							},
							"end": {
								"x" : 1,
								"y" : 2
							}
						},
						"color" : "red"
					},
					"rigidbody": {
						"shape": Shapes.BOX,
						"mass": 0.5,
						"bouncy": 0.8,
						"properties": {
							"start" : {
								"x" : -0.5,
								"y" : -1
							},
							"end" : {
								"x" : 1,
								"y" : 2
							}
						}
					}
				}
			}
		]
	};
});