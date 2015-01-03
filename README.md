wak-oauth
=========

Wakanda example of [Twitter Sign-in](https://dev.twitter.com/web/sign-in) (OAuth 1.0a).

Example
-------
1. Sign up for Twitter.
2. Register as Twitter Developer.
3. Register an application.
4. Configure the application settings.

**Callback URL**: your application URL + '/twitter/authenticate'

The pattern corresponds to the one registered by addRequestHander in bootstrap.js.

**Application Icon**: optional.

**Allow this application to be used to sign in with Twitter**: Check. 

Keep note of the cosumer key and secret key.

Create a JSON file in the following format and store it in Modules/twitter/config.json.

```JS
{
  "consumerKey":"7Mvw************kxpg",
  "consumerSecret":"Gdiu**********************yXZ4",
  "redirectUri":"http://127.0.0.1:8081/twitter/authorize"
}
```
