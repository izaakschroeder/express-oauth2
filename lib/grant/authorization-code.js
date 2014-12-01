
'use strict';

var _ = require('lodash'),
	express = require('express'),
	grants = require('../grants'),
	required = require('../util').required;

// https://tools.ietf.org/html/rfc6749#section-4.1

module.exports = function authorizationCode(options) {

	var router = express.Router();

	// Shorthand
	if (_.isFunction(options)) {
		options = { lookup: options };
	}

	// Type checks
	if (!_.has(options, 'lookup')) {
		throw new TypeError();
	}

	router.use(grants('authorization_code', true));
	router.use(required(['code']));

	router.use(function (req, res, next) {
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
	});

	// Middleware
	return router;
};
