define (['j.Shapes'], function (Shapes) {
	return {
	name: 'main',
	worldProperties: {
		gravity: 9.8
	},
	camera : {
		position : {
			"x" : 5,
			"y" : 4
		}
	},
	content: {
			"10" : {
				"label" : "bigcircle",
				"_id" : 10,
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
						"bouncy": 0,
						"properties": {
							"center": {
								"x" : 0,
								"y" : 0
							}
						}
					}
				}
			},

			"11" : {
				"label" : "minicircle",
				"transform": {
					"position": {
						"x" : 3,
						"y" : 6
					},
					"angle" : 0.3
				},
				"components": {
					"inputable" : {},
					"renderer": {
						"shape" : Shapes.CIRCLE,
						"properties": {
							"center": {
								"x" : 0,
								"y" : 0
							},
							"radius" : 0.5
						},
						"color" : "orange"
					},
					"rigidbody": {
						"shape": Shapes.CIRCLE,
						"mass": 1,
						"properties": {
							"center": {
								"x" : 0,
								"y" : 0
							},
							"radius" : 0.5
						}
					}
				}
			},

			"12" : {
				"label" : "minibox",
				"tag": "box",
				"transform": {
					"position": {
						"x": 6,
						"y": 5
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
						"bouncy": 0,
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
			"13" : {
				"label" : "player",
				"transform": {
					"position": {
						"x": 8,
						"y": 5
					}
				},
				"components": {
					"inputable" : {},
					"renderer": {
						"shape": Shapes.BOX,
						"properties": {
							"start" : {
								"x" : -1,
								"y" : -1
							},
							"end" : {
								"x" : 2,
								"y" : 2
							}
						},
						"color" : "brown"
					},
					"rigidbody": {
						"shape": Shapes.BOX,
						"mass": 3,
						"properties": {
							"start" : {
								"x" : -1,
								"y" : -1
							},
							"end" : {
								"x" : 2,
								"y" : 2
							}
						}
					}
				}
			},

			"14" : {
				"label" : "bigbox",
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
						"mass": 2,
						"fixed" : false,
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
			},
			"15" : {
				"label" : "floor",
				"transform": {
					"position": {
						"x": 5,
						"y": 0.5
					},
					"angle": 0
				},
				"components": {
					"renderer": {
						"shape" : Shapes.BOX,
						"properties" : {
							"start" : {
								"x" : -5,
								"y" : -0.5
							},
							"end": {
								"x" : 20,
								"y" : 1
							}
						},
						"color" : "red"
					},
					"rigidbody": {
						"shape": Shapes.BOX,
						"mass": 1,
						"fixed" : true,
						"bouncy": 0,
						"properties": {
							"start" : {
								"x" : -5,
								"y" : -0.5
							},
							"end" : {
								"x" : 20,
								"y" : 1
							}
						}
					}
				}
			},
		}
	};
});