var chai = require('chai'),
	sinon = require('sinon'),
	sinonChai = require("sinon-chai"),
	Giffy = require('../src/giffy'),
	expect = chai.expect;

chai.use(sinonChai);

describe('Giffy', function() {

	var mockConfig,
		sandbox,
		consoleLogStub;

	beforeEach(function() {
		mockConfig = {
			img: ''
		};

	    sandbox = sinon.sandbox.create();
        consoleLogStub = sandbox.stub(window.console, "log");
	});

	afterEach(function() {
    	sandbox.restore();
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