var http = {};

function send(method, url, body, headers){
	var result = {};
	//url must be string
	if(typeof url === 'string' && url.length !== 0){	
		var xhr = new XMLHttpRequest();
		xhr.open(method, url);
		//headers must be array of {name:name, value:value}
		if(Array.isArray(headers)){
			headers.forEach(function(header, i){
				if(header.hasOwnProperty('name') && header.hasOwnProperty('value')){
					xhr.setRequestHeader(header.name.trim(), header.value.trim());
				}
			});
		}	
		if(typeof body === 'string'){
			xhr.setRequestHeader('Content-length', body.length);
		}else
		if(body instanceof File){
			xhr.setRequestHeader('Content-length', body.size);
		}
		//perhaps support blob, buffer, binary stream?
		xhr.onreadystatechange = function() { 	
			if (this.readyState == 4) { 
				result.readyState = this.readyState;
				result.response = this.response;
				result.responseText = this.responseText;
				result.responseType = this.responseType;
				result.status = this.status;
				result.statusText = this.statusText;	
			}
		}
		try{
			xhr.send(body);
		}catch(e){
			for(var i = 0;i < e.messages.length;++i){
				console.error('%s', e.messages[i]);			
			}
		}
	}
	return result;
}

http.put = function(url, body, headers){
	return send('PUT', url, body, headers);
} 

http.post = function(url, body, headers){
	return send('POST', url, body, headers);
} 

http.options = function(url, body, headers){
	return send('OPTIONS', url, body, headers);
} 

http.trace = function(url, body, headers){
	return send('TRACE', url, body, headers);
} 

http.connect = function(url, body, headers){
	return send('CONNECT', url, body, headers);
} 

http['delete'] = function(url, headers){
	var body;
	return send('DELETE', url, body, headers);
} 

http['get'] = function(url, headers){
	var body;
	return send('GET', url, body, headers);
} 

http.head = function(url, headers){
	var body;
	return send('HEAD', url, body, headers);
} 

http.options = function(url, headers){
	var body;
	return send('OPTIONS', url, body, headers);
} 
