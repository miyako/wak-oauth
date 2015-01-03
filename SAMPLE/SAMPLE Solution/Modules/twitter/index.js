include('hmac-sha1.js', 'relative');
include('http-client.js', 'relative');

function hmacsha1(key, value){
	if((typeof key === 'string') && (typeof value === 'string')){
		var hash = CryptoJS.HmacSHA1(value, key);
		var buf = new Buffer(hash.sigBytes);
		hash.words.forEach(function(word, i){
			buf.writeInt32BE(word, i*4, false);  
		});
		return buf.toString('base64');	
	}
}

function sortObject(obj){
	var arr = [];
	for (var p in obj){
		arr.push({key:p, value:obj[p]});
	}
	arr.sort(function(a,b){
		return a.key.localeCompare(b.key);
	});
	return arr;
}

function computeOAuthBaseString(endpoint, method, params){
	params = sortObject(params);
	var str = '';
	str += method;
	str += '&';
	str += encodeURIComponent(endpoint);
	str += '&';
	var append;
	params.forEach(function(param, i){
		if(i !== 0){
			str += '%26';
		}
		if(param.key.indexOf('oauth_') === 0){
			str += (encodeURIComponent(param.key + '=' + encodeURIComponent(param.value)));
		}else{
			str += (param.key + '=' + encodeURIComponent(param.value));
		}		
	})
	return str;
}

function computeOAuthHeader(params){
	params = sortObject(params);
	var str = 'OAuth ';
	params.forEach(function(param, i){
		if(param.key.indexOf('oauth_') === 0 || param.key === 'realm'){
			if(str !== 'OAuth '){
				str += ',';
			}
			if(param.key.indexOf('oauth_') === 0){
				str += (param.key + '="' + encodeURIComponent(param.value) + '"');
			}else{
				str += (param.key + '="' + param.value + '"');
			}
		}
	})
	return str;
}

function authenticate(consumerKey, consumerSecret, redirectUri){
	
	consumerSecret = encodeURIComponent(consumerSecret);
	
	var oauth_nonce = generateUUID();
	var oauth_signature_method = 'HMAC-SHA1';
	var oauth_timestamp = Date.now().toString().slice(0, -3);
	var oauth_version = '1.0';
	var realm = 'https://api.twitter.com/';
	var endpoint = 'https://api.twitter.com/oauth/request_token';
		
	var params = {
		'oauth_callback':redirectUri,
		'oauth_consumer_key':consumerKey,
		'oauth_nonce':oauth_nonce,
		'oauth_signature_method':oauth_signature_method,
		'oauth_timestamp':oauth_timestamp,
		'oauth_version':oauth_version	
	};
	
	var baseString = computeOAuthBaseString(endpoint, 'POST', params);
	var signature = computeOAuthSignature(consumerSecret, baseString);
	var authorization = computeOAuthAuthorizationHeader(signature, realm, params);

	var result = postOAuth(endpoint, authorization);	
	
	if(result && (result.status === 200)){
		return getURLQuery('?' + result.responseText);
	}	
}

function authorize(consumerKey, consumerSecret, oauth_token, oauth_verifier){
	
	consumerSecret = encodeURIComponent(consumerSecret);
	
	var oauth_nonce = generateUUID();
	var oauth_signature_method = 'HMAC-SHA1';
	var oauth_timestamp = Date.now().toString().slice(0, -3);
	var oauth_version = '1.0';
	var endpoint = 'https://api.twitter.com/oauth/access_token';
	
	var params = {
		'oauth_consumer_key':consumerKey,
		'oauth_nonce':oauth_nonce,
		'oauth_signature_method':oauth_signature_method,
		'oauth_timestamp':oauth_timestamp,
		'oauth_token':oauth_token,			
		'oauth_verifier':oauth_verifier,		
		'oauth_version':oauth_version	
	};	
	
	var baseString = computeOAuthBaseString(endpoint, 'POST', params);
	var signature = computeOAuthSignature(consumerSecret, baseString);
	var authorization = computeOAuthAuthorizationHeader(signature, null, params);
	return postOAuth(endpoint, authorization);
}

function computeOAuthSignature(secret, baseString){
	return hmacsha1(secret + '&', baseString);
}

function computeOAuthAuthorizationHeader(signature, realm, params){
	params['oauth_signature'] = signature;
	if(realm){
		params['realm'] = realm;
	}
	return computeOAuthHeader(params);
}

function postOAuth(endpoint, authorization){
	var body = '';	
	var headers = [
		{'name':'Accept-Encoding', 'value':'gzip'},
		{'name':'User-Agent', 'value':'wakanda (gzip)'},
		{'name':'Content-Type', 'value':'application/x-www-form-urlencoded'},
		{'name':'Authorization', 'value':authorization}			
	];
	return http.post(endpoint, body, headers);
}

exports.authorize = authorize;
exports.authenticate = authenticate;