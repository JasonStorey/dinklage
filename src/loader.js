var Loader = function Loader() {
	
	function load(url, success, error) {
		var request = new XMLHttpRequest();

	    if(request) {
	        request.open('GET', url, true);
	        request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	        request.send(null);

            request.onreadystatechange = function() {
                if(request.readyState === 4) {
                	if(request.status === 200) {
                		success(JSON.parse(request.responseText));	
                	} else {
                		error('Error', request.status);
                	}
                    
                    request = null;
                }
            };
	    } else {
	        error('XMLHttpRequest not supported');
	    }
	}

	return {
		load: load
	};
};

module.exports = Loader();