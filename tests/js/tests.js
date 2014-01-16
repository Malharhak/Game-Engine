define (['j.main', 'chai'], function (j, chai) {
	var should = chai.should();
	console.log("coucou", jage);
	describe('jage', function () {
		describe ('.basic', function () {
			it('should exist', function () {
				should.exist(jage);
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