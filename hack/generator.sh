#!/usr/bin/env node

var fs = require('fs'),
	path = require('path');

var config = {
	fps: 16,
	dirname: './swampland'
};

fs.readdir(config.dirname, function(err, filenames) {
	var buffers = [buildDinkHeader()];

	filenames.forEach(function(filename, index) {
		var filepath = path.join(config.dirname, filename);
		
		if(filename.charAt(0) === '.') {
			return;
		}

		var data = fs.readFileSync(filepath);
		buffers.push(buildFrameHeader(data), data);
		if(index === filenames.length - 1) {
			writeDink(buffers);
		}
	});
});

function buildFrameHeader(data) {
	var frameHeaderSize = 2;
	var buffer = new Buffer(frameHeaderSize);
 	buffer.writeUInt16LE(data.length, 0);
 	return buffer;
}

function buildDinkHeader() {
	var dinkHeaderSize = 2;
	var buffer = new Buffer(dinkHeaderSize);
 	buffer.writeUInt16LE(config.fps, 0);
 	return buffer;
}

function writeDink(buffers) {
	fs.writeFile('test.dink', Buffer.concat(buffers), function(err){
		if (err) throw err;
  		console.log('Saved!');
	});
}