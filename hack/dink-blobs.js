var fps,
	numOfFrames,
	imgElement = document.getElementById('dink'),
	frames = [],
	currentFrameIndex = 0;

//loadDink("http://test.video.unrulymedia.com/jason/dinklage/examples/swampland.dink");
loadDink("http://test.video.unrulymedia.com/jason/dinklage/examples/test.dink");


function loadDink(url) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";
    
    oReq.onload = function (oEvent) {
		var arrayBuffer = oEvent.currentTarget.response,  // Note: not oReq.responseText
			readHead = 0,
			dinkHeaderSize = 2;

		if (arrayBuffer) {
			fps = new Uint16Array(arrayBuffer.slice(readHead, dinkHeaderSize))[0];
			readHead += dinkHeaderSize;
			blobs = createBlobs(readHead, arrayBuffer);
			numOfFrames = blobs.length;

			frames = blobs.map(function(blob) {
				return URL.createObjectURL(blob);
			});

			play();
		}
    };
    
    oReq.send(null);    
}

function createBlobs(currentLocation, arrayBuffer) {
	var readHead = currentLocation,
		frameHeaderSize = 2,
		blobs = [],
		frameSize,
		image;

	frameSize = new Uint16Array(arrayBuffer.slice(readHead, readHead + frameHeaderSize))[0];
	readHead += frameHeaderSize;

	image = new Uint8Array(arrayBuffer.slice(readHead, readHead + frameSize));
	readHead += frameSize;

	blobs.push(new Blob([image], {type: 'image/jpeg'}));

	if(readHead < arrayBuffer.byteLength) {
		blobs = blobs.concat(createBlobs(readHead, arrayBuffer));
	}
	return blobs;
}

function play() {
    var timeoutInterval = Math.floor(1000/fps),
        lastFrameIndex =  numOfFrames - 1,
        frameTimeout;

    function updateSrc() {
        imgElement.src = frames[currentFrameIndex];
    }

    function nextFrame() {
        currentFrameIndex++;
        updateSrc();

        if(currentFrameIndex === lastFrameIndex) {
            currentFrameIndex = -1;
        }
        frameTimeout = window.setTimeout(nextFrame, timeoutInterval);
    }

    updateSrc();
    frameTimeout = window.setTimeout(nextFrame, timeoutInterval);
};

/*
function parseBlobs (oEvent) {
	var arrayBuffer = oReq.response; // Note: not oReq.responseText
	if (arrayBuffer) {
		var byteArray = new Uint8Array(arrayBuffer);
		var blobs = [],
			startByte = 0;
		for (var i = 0; i < byteArray.byteLength; i++) {        
			if(byteArray[i] === 217 && byteArray[i - 1] === 255) {
				blobs.push(new Blob([arrayBuffer.slice(startByte, i + 1)], {type: "image/jpeg"}));
				startByte = i + 1;
			}
		}

		frames = blobs.map(function(blob) {
			return URL.createObjectURL(blob);
		});

		play();
	}
};		
*/