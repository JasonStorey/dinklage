var Loader = require('../src/loader.js');

describe('Loader', function() {

	it('should call success callback with valid json response when request is successful', function(done) {
		var successCallback = sinon.spy(),
			errorCallback = sinon.spy();

		Loader.load('http://echo.jsontest.com/key/value', function(resp) {
			successCallback(resp);
			expect(successCallback).to.have.been.calledOnce;
			expect(successCallback).to.have.been.calledWith({"key":"value"});
			expect(errorCallback).to.not.have.been.called;			
			done();
		}, function(msg, status) {
			errorCallback(msg, status);
			done(msg);
		});
	});

	it('should call error callback when url is not found', function(done) {
		var successCallback = sinon.spy(),
			errorCallback = sinon.spy();

		Loader.load('http://does-not-exist', function(resp) {
			successCallback(resp);
			done('Success should not be called');
		}, function(msg, status) {
			errorCallback(msg, status);
			expect(errorCallback).to.have.been.calledOnce;
			expect(errorCallback).to.have.been.calledWith('Error', 0);
			expect(successCallback).to.not.have.been.called;
			done();
		});
	});
});