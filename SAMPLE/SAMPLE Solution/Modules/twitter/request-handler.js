var twitter = require('twitter');
var rootPath = getItemsWithRole('webFolder').path;  

function authorize(request, response){
	
	response.allowCache(true);
	response.contentType = 'text/html';
	response.body = loadText(rootPath + 'index.html');
	response.statusCode = 200;
	
	var q = getURLQuery(request.rawURL);	
	var result = twitter.authorize(q.oauth_token, q.oauth_verifier);
	if(result && result.status === 200){
		
		q = getURLQuery('?' + result.responseText);

		createUserSession({
		    'ID':generateUUID(),
		    'name':q.screen_name,
		    'fullName':q.screen_name,
		    storage:{
	            'oauth_token':q.oauth_token,
	            'oauth_token_secret':q.oauth_token_secret
            },
		    belongsTo:['Admin']
	    });
	}
}