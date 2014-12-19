# express-oauth2

[RFC6749] compliant [express] middleware to build your own [OAuth2] server.

![build status](http://img.shields.io/travis/izaakschroeder/express-oauth2.svg?branch=master&style=flat)
![coverage](http://img.shields.io/coveralls/izaakschroeder/express-oauth2.svg?branch=master&style=flat)
![license](http://img.shields.io/npm/l/express-oauth2.svg?style=flat)
![version](http://img.shields.io/npm/v/express-oauth2.svg?style=flat)
![downloads](http://img.shields.io/npm/dm/express-oauth2.svg?style=flat)

## Usage

OAuth2 providers require 2 endpoints: one for tokens (typically `/oauth/token`) and one for authorization (typically `/oauth/authorize`). These routes are available as middleware and care should be taken to configure them appropriately.

## Grants

There are several grants built in to OAuth2 including [authorization_code], [client_credentials], [implicit], [password] and [refresh_token].

Using a grant is as simple as declaring a route that provides your grant type:

```javascript
app.post(
	'/oauth/token',
	OAuth.grants('my-grant-type'),
	grantHandler(),
	// ...
	OAuth.endpoint.token()
);
```

### authorization_code

[RFC](https://tools.ietf.org/html/rfc6749#section-4.1)

```javascript
app.post(
	'/oauth/token',
	OAuth.grants('authorization_code'),
	OAuth.grant.authorizationCode()
);
```

### client_credentials

[RFC](https://tools.ietf.org/html/rfc6749#section-4.4)

```javascript
app.post(
	'/oauth/token',
	OAuth.grants('client_credentials'),
	OAuth.grant.clientCredentials()
);
```

### implicit

[RFC](https://tools.ietf.org/html/rfc6749#section-4.2)

```javascript
app.post(
	'/oauth/token',
	OAuth.grants('implicit'),
	OAuth.grant.implicit()
);
```

### password

[RFC](https://tools.ietf.org/html/rfc6749#section-4.3)

```javascript
app.post(
	'/oauth/token',
	OAuth.grants('password'),
	OAuth.grant.password()
);
```

### refresh_token

[RFC](https://tools.ietf.org/html/rfc6749#section-6)

```javascript
app.post(
	'/oauth/token',
	OAuth.grants('refresh_token'),
	OAuth.grant.refreshToken()
);
```

### custom

Roll your own grant!

```javascript
app.post(
	'/oauth/token',
	OAuth.grants('my_grant_type'),
	myGrantMiddleware
);
```

## Other OAuth2 Servers

 * [node-oauth2-server]

[express]: http://expressjs.com/
[OAuth2]: http://oauth.net/2/
[RFC6749]: https://tools.ietf.org/html/rfc6749
[node-oauth2-server]: https://github.com/thomseddon/node-oauth2-server
