var	Giffy = require('../src/giffy.js');

describe('Giffy', function() {

	var mockConfig;

	beforeEach(function() {
		mockConfig = {
			img: ''
		};

	});

	describe('constructor', function() {
		it('should store img element when present in config', function() {
			var giffy,
				mockImg = document.createElement('img');
			
			mockConfig.img = mockImg;			
			giffy = new Giffy(mockConfig);

			expect(giffy.img).to.equal(mockImg);
		});

		it('should read manifest file from data-manifest img attribute', function() {
			var giffy,
				mockImg = document.createElement('img'),
				manifestUrl = 'manifest.json';

			mockImg.setAttribute('data-manifest', manifestUrl)
			mockConfig.img = mockImg;			
			giffy = new Giffy(mockConfig);

			expect(giffy.manifest).to.equal(manifestUrl);
		});
	});
});