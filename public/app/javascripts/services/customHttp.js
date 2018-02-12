module.exports = function(){

	function parseJSON(val){
		var finalParams = '';
		for(var i in val){
			finalParams += i+'='+val[i]+'&';
		}
		return finalParams;
	}

	return {
        sendPostRequest : function sendPostRequest(url, data) {
            return new Promise(function (resolve, reject) {
			    var xhr = new XMLHttpRequest();
			    xhr.open('POST', url);
			    //Send the proper header information along with the request
				xhr.setRequestHeader("Content-type", "application/json");
			    xhr.onload = function (params) {
			      	if (this.status >= 200 && this.status < 300) {
			        	resolve(xhr.response);
			      	} else {
			        	reject({
				          	status: this.status,
				          	statusText: xhr.statusText
				        });
			      	}
			    };
			    xhr.onerror = function (params) {
			      	reject({
				        status: this.status,
				        statusText: xhr.statusText
			      	});
			    };
			    xhr.send(parseJSON(data));
		  	});
        },
        sendGetRequest : function sendGetRequest(url, data) {
			return new Promise(function (resolve, reject) {
			    var xhr = new XMLHttpRequest();
			    xhr.open('GET', url, true);
			    xhr.setRequestHeader("Content-type", "application/json");
			    xhr.setRequestHeader("user-key", "be9b71f8d5d97d7e486150e5021dfea3");
			    xhr.onload = function (params) {
			      	if (this.status >= 200 && this.status < 300) {
			        	resolve(xhr.response);
			      	} else {
			        	reject({
				          	status: this.status,
				          	statusText: xhr.statusText
				        });
			      	}
			    };
			    xhr.onerror = function (params) {
			      	reject({
				        status: this.status,
				        statusText: xhr.statusText
			      	});
			    };
			    xhr.send(parseJSON(data));
		  	});
        }
    }
}