define (['j.main', 'chai', 'j.componentTypes', 'scenes/main', 'j.sceneManager'
	],
function (j, chai, componentTypes, mainScene, sceneManager) {
	var should = chai.should();

	console.log("coucou", jage);
	describe('jage', function () {
		describe ('.basic', function () {
			it('should exist', function () {
				should.exist(jage);
			});
		});

		describe('.gameloop', function () {
			it('should launch and callback', function (done) {
				jage.init({}, function () {
					done();
				});
			});
		});
		describe('.currentScene', function () {
			it('should have an entity list', function () {
					sceneManager.activeScene.should.have.property('entities');
			});
		});
		describe('registerScenes', function () {
			it('should have a scene description for main', function () {
					sceneManager.registerScene('main', mainScene);
					sceneManager.sceneDescriptions.should.have.property('main');
			});
		});
		describe('.ES', function () {
			describe('.componentTypes', function () {
				it('should have a renderer', function ()  {
					componentTypes.should.have.property('renderer');
				});
			});
			var ent;
			describe('.createEnttiy', function () {
				it ('should create an entity', function () {
					ent = sceneManager.activeScene.createEntity("lol");
					(typeof ent).should.equal('number');
					console.log("Created entity: ", ent);
				});
			});
			var cmp;
			describe('.createComponentAndAddTo', function () {
				it('should create a position and add it to the entity', function () {
					cmp = sceneManager.activeScene.createComponentAndAddTo(
							ent,
							"renderer",
							{width: 20});
					(typeof cmp).should.equal("number");
				});
			});
			var cmpValue;
			describe (".getComponentValue", function () {
				it('should get a renderer with width 20 and height 40', function () {
					cmpValue = sceneManager.activeScene.getComponentValue("renderer", cmp);
					cmpValue.should.have.property('width', 20);
					cmpValue.should.have.property('height', 40);
				});
			});
			describe('.setComponent', function () {
				it ('should set renderer to width 10 height 30', function () {
					cmpValue.width = 10;
					cmpValue.height = 30;
					//sceneManager.activeScene.setComponent(cmpValue);
					var nValue = sceneManager.activeScene.getComponentValue("renderer", cmp);
					nValue.should.have.property('width', 10);
					nValue.should.have.property('height', 30);
				});
			});
			var entities = [];
			describe('.getEntitiesForComponents', function () {
				it('should return me the previously created entity', function () {
					entities = sceneManager.activeScene.getEntitiesForComponents(['renderer']);
					(typeof entities).should.equal("object");
					(entities.length).should.equal(1);
					entities[0].should.have.property('transform');
				});
			});
			var rend;
			describe('.getComponentForEntity', function () {
				it('should find the renderer for the first entity', function () {
					rend = sceneManager.activeScene.getComponentForEntity("renderer", entities[0]._id);
					(typeof rend).should.equal("object");
					rend.should.have.property("width", 10);
				});
			});
		});
		describe('.launchScene', function () {
			it('should launch the main scene', function (done) {
				jage.launchScene('main', function () {
					done();
				});
			});
		});
	});
});