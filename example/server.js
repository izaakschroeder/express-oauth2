
var http = require('http'),
	express = require('express'),
	authenticated = require('express-authentication'),
	allows = require('express-allows'),
	bodyParser = require('body-parser'),
	oauth = require(__dirname + '/..');

var app = express();


var accounts = [
	{ id: 1, username: 'bob', password: 'test' },
	{ id: 2, username: 'sam', password: 'test' }
];

var credentials = [
	{ clientId: 'sam', clientSecret: 'bar' },
	{ clientId: 'bob', clientSecret: 'xyz' },
	{ clientId: 'www', clientSecret: 'foo' },
	{ clientId: 'xxx', clientSecret: 'yyy' }
];

var tokens = [

];


function is(type) {
	return function(req, res, next) {
		if (!req.is(type)) {
			return next({ statusCode: 415 });
		} else {
			return next();
		}
	}
}

app.use('/oauth/token', allows('POST'));

// Common elements.
app.post(
	'/oauth/token',

	// HTTP 415 if not urlencoded
	is('application/x-www-form-urlencoded'),

	// Get the body
	bodyParser.urlencoded({ extended: false }),

	// Authenticate the client
	oauth.auth.client(function(where, callback) {
		var res = _.find(credentials, where);
		callback(null, !!res, res);
	})
);

app.post(
	'/oauth/token',
	oauth.grants('password'),
	authenticated('oauth-client'),
	oauth.grant.password(function (search, callback) {
		callback(null, _.find(accounts, search));
	}),
	oauth.endpoint.token()
);

app.post(
	'/oauth/token',
	oauth.grants('authorization_code'),
	authenticated(),
	oauth.grant.authorizationCode(function(search) {

	}),
	oauth.endpoint.token()
);

app.post(
	'/oauth/token',
	oauth.grants('client_credentials'),
	oauth.grant.clientCredentials(function(search) {

	}),
	oauth.endpoint.token()
);

app.post(
	'/oauth/token',
	oauth.grants('refresh_token'),
	authenticated(),
	oauth.grant.refreshToken(),
	oauth.endpoint.token()
);

app.use('/oauth/authorize', allows('GET'));
app.get(
	'/oauth/authorize',
	oauth.client(),
	oauth.endpoint.authorize()
);



app.use(oauth.auth.bearer());

app.use(function(err, req, res, next) {
	console.log(err);
	if (err.statusCode) {
		res.status(err.statusCode);
	}
	next(err);
});

//app.get('/', authenticated('oauth'), hello);


http.createServer(app).listen(process.env.PORT || 9919);
