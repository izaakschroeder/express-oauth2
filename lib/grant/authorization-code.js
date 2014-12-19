
'use strict';

var _ = require('lodash'),
	async = require('express-async'),
	grants = require('../grants'),
	required = require('../util').required;

// https://tools.ietf.org/html/rfc6749#section-4.1

module.exports = function authorizationCode(options) {

	// Shorthand
	if (_.isFunction(options)) {
		options = { lookup: options };
	}

	// Type checks
	if (!_.has(options, 'lookup')) {
		throw new TypeError();
	}

	// Middleware
	return async.series(
		grants('authorization_code', true),
		required(['code']),
		function (req, res, next) {
			options.lookup(req.body.code, function(err, result) {
				if (err) {
					next(err);
				} else if (!result) {
					next({ error: 'INVALID_GRANT' });
				} else if (result.clientId !== req.body.client_id) {
					next({ error: 'INVALID_GRANT' });
				} else if (result.expires < Date.now()) {
					next({ error: 'INVALID_GRANT' });
				} else {
					next();
				}
			});
		}
	);
};
