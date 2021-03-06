
'use strict';

var _ = require('lodash'),
	async = require('express-async'),
	grants = require('../grants'),
	required = require('../util').required;

// https://tools.ietf.org/html/rfc6749#section-4.4

module.exports = function clientCredentials(options) {

	return async.series(
		grants('client_credentials', true),
		function middleware(req, res, next) {
			lookup({
				clientId: req.body.client_id,
				clientSecret: req.body.client_secret
			}, function(err, result) {
				if (err) {
					return next(err);
				} else if (!result) {
					return next({ });
				} else {
					next();
				}
			});
		}
	);
};
