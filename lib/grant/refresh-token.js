
'use strict';

var _ = require('lodash'),
	async = require('express-async'),
	grants = require('../grants'),
	required = require('../util').required;

// https://tools.ietf.org/html/rfc6749#section-6

/*
OPTIONAL.  The scope of the access request as described by
         Section 3.3.  The requested scope MUST NOT include any scope
         not originally granted by the resource owner, and if omitted is
         treated as equal to the scope originally granted by the
         resource owner.
		*/

module.exports = function refreshToken(options) {
	return async.series(
		grants('refresh_token', true),
		required(['refresh_token']),
		function (req, res, next) {
			options.consume({
				refreshToken: req.body.refresh_token,
				scope: req.body.scope
			}, function(err, token) {
				if (err) {
					return next(err);
				} else if (!token) {
					next({ statusCode: 400, error: 'TOKEN_INVALID' });
				} else if (token.clientId !== clientId) {
					next({ statusCode: 400, error: 'TOKEN_INVALID' });
				} else if (token.expires < Date.now()) {
					next({ statusCode: 400, error: 'TOKEN_EXPIRED' });
				} else {
					next();
				}
			});
		}
	);
};
