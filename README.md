wak-oauth
=========

Wakanda example of [Twitter Sign-in](https://dev.twitter.com/web/sign-in) (OAuth 1.0a).

![obsolete-word-black-frame-word-obsolete-word-black-frame-d-rendering-123942590](https://user-images.githubusercontent.com/1725068/78463940-29122280-771e-11ea-8be8-a7830725403e.jpg)

Old Wakanda.

Install
-------
1. Sign up for Twitter.
2. Register as Twitter Developer.
3. Register an application.
4. Configure the application settings.

![](https://github.com/miyako/wak-oauth/blob/master/images/1.png)

**Callback URL**: your application URL + '/twitter/authenticate'

The pattern corresponds to the one registered by addRequestHander in [bootstrap.js](https://github.com/miyako/wak-oauth/blob/master/SAMPLE/SAMPLE/bootstrap.js).

**Website**: Mandatory.

**Application Icon**: optional.

**Allow this application to be used to sign in with Twitter**: Enabled. 

Swith to the Keys and Access Tokens page.

![](https://github.com/miyako/wak-oauth/blob/master/images/2.png)

Keep note of the **Cosumer Key** and **Cosumer Secret**.

Create a JSON file in the following format and store it in Modules/twitter/config.json.

```JS
{
  "consumerKey":"7Mvw************kxpg",
  "consumerSecret":"Gdiu**********************yXZ4",
  "redirectUri":"http://127.0.0.1:8081/twitter/authorize"
}
```
Example
-------
Start the project. Open index.html. A "sign in with Twitter" button should appear.

![](https://github.com/miyako/wak-oauth/blob/master/images/6.png)

By clicking it, the user will be resirect to Twitter OAuth.

![](https://github.com/miyako/wak-oauth/blob/master/images/3.png)

If the user authorises the application, the browser will redirect to index.html.

![](https://github.com/miyako/wak-oauth/blob/master/images/4.png)

Notice that WAK.directory.currentUser() is an object with the user's Twitter name.

![](https://github.com/miyako/wak-oauth/blob/master/images/5.png)
