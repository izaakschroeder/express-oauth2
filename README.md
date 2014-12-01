# express-authentication-oauth2-server

Elegant [express] middleware for your own [OAuth 2] server.

![build status](http://img.shields.io/travis/izaakschroeder/s3-streams.svg?style=flat)
![coverage](http://img.shields.io/coveralls/izaakschroeder/s3-streams.svg?style=flat)
![license](http://img.shields.io/npm/l/s3-streams.svg?style=flat)
![version](http://img.shields.io/npm/v/s3-streams.svg?style=flat)
![downloads](http://img.shields.io/npm/dm/s3-streams.svg?style=flat)

Inspired by [node-oauth2-server].

## Usage

OAuth2 providers require 2 endpoints: one for tokens (typically `/oauth/token`) and one for authorization (typically `/oauth/authorize`). These routes are available as middleware and care should be taken to configure them appropriately.

```javascript
var express = require('express'),
	Authentication = require('express-authentication'),
	OAuth = require('express-authentication-oauth2-server');

var app = express(),
	authentication = Authentication(),
	oauth = express.Route();

var client = OAuth.auth.client();

oauth.get(
	'/authorize',
	// Invoke authorize middleware
	OAuth.endpoint.authorize()
);

oauth.post(
	'/token',
	// You must have some way of filling req.body; the most sane and standards
	// conforming way of doing this is just using body-parser.
	bodyParser.urlencoded({ extended: false }),
	// The token endpoint optionally may be authenticated. It is probably wise
	// to enable some kind of authentication here. Anything that's compatible
	// with `express-authentication` will do.
	client

);

// Setup basic grants
oauth.post(
	'/token',
	// When requesting an authorization_code:
	OAuth.grants('authorization_code'),
	// Require client authentication,
	authentication.by(client).required(),
	// Invoke middleware for the authorization_code grant,
	OAuth.grant.authorizationCode(),
	// Invoke overall token middleware.
	OAuth.endpoint.token()
);

oauth.post(
	'/token',
	// When requesting a refresh_token:
	OAuth.grants('refresh_token'),
	// Require client authentication,
	authentication.required(),
	// Invoke middleware for the refresh_token grant,
	OAuth.grant.refreshToken(),
	// Invoke overall token middleware.
	OAuth.endpoint.token()
);

// Load the oauth middleware
app.use('/oauth', oauth);

// Create the bearer authentication middleware
var bearer = OAuth.auth.bearer();

// Allow any request to be authenticated with OAuth
app.use(bearer);

// Protect some secret area
app.get(
	'/secret',
	authentication.by(bearer).required(),
	function(req, res, next) {
		res.status(200).send('hello.');
	}
);
```

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

[express]: http://expressjs.com/
[OAuth 2]: http://oauth.net/2/
[node-oauth2-server]: https://github.com/thomseddon/node-oauth2-server
