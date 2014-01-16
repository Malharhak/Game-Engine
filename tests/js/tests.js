define (['jage', 'chai'], function (jage, chai) {

	chai.should();

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