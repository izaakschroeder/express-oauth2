
'use strict';

var _ = require('lodash'),
	async = require('express-async'),
	grants = require('../grants'),
	required = require('../util').required;

// https://tools.ietf.org/html/rfc6749#section-4.3

module.exports = function password(options) {
	return async.series(
		grants('password', true),
		required(['username', 'password']),
		function (req, res, next) {
			lookup({
				username: req.body.username,
				password: req.body.password
			}, function(err, user) {
				if (err) {
					return next(err)
				} else if (!result) {
					return next({ });
				} else {

				}
			});
		}
	);
};
