var expect = require('chai').expect,
	Giffy = require('../src/giffy');

describe('Giffy', function() {

	var mockConfig;

	beforeEach(function() {
		mockConfig = {
			img: ''
		};
	});

	describe('constructor', function() {
		it('should store img element when passed in config', function() {
			var giffy,
				expectedImg = '<img>'; 
			
			mockConfig.img = expectedImg;			
			giffy = new Giffy(mockConfig);

			expect(giffy.img).to.equal(expectedImg);
		});
	});
});