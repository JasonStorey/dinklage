var	Dinklage = require('../src/dinklage.js');

describe('Dinklage', function() {

	var mockConfig;

	beforeEach(function() {
		mockConfig = {
			img: ''
		};

	});

	describe('constructor', function() {
		it('should store img element when present in config', function() {
			var dinklage,
				mockImg = document.createElement('img');
			
			mockConfig.img = mockImg;			
			dinklage = new Dinklage(mockConfig);

			expect(dinklage.img).to.equal(mockImg);
		});

		it('should read manifest file from data-manifest img attribute', function() {
			var dinklage,
				mockImg = document.createElement('img'),
				manifestUrl = 'manifest.json';

			mockImg.setAttribute('data-manifest', manifestUrl)
			mockConfig.img = mockImg;			
			dinklage = new Dinklage(mockConfig);

			expect(dinklage.manifest).to.equal(manifestUrl);
		});
	});
});