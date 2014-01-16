define (['j.main', 'chai', 'j.componentTypes'], function (j, chai, componentTypes) {
	var should = chai.should();

	console.log("coucou", jage);
	describe('jage', function () {
		describe ('.basic', function () {
			it('should exist', function () {
				should.exist(jage);
			});
		});
		describe('.gameloop', function () {
			it('should launch', function () {
				jage.init();
			});
		});


		describe('.ES', function () {
			describe('.componentTypes', function () {
				it('should have a transform', function ()  {
					componentTypes.should.have.property('transform');
				});
			});
		});
	});

	describe('doesItWork', function () {
		describe('.lol', function () {
			it('should work', function () {

				var lol = {lol : "lol"};
				console.log("test inside");
				lol.should.have.property('lol', 'lol');
			});
		});
	});
});