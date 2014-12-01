
'use strict';

var _ = require('lodash'),
	express = require('express'),
	grants = require('../grants'),
	required = require('../util').required;

// https://tools.ietf.org/html/rfc6749#section-4.3

module.exports = function password(options) {
	var router = express.Router();

	router.use(grants('password', true));
	router.use(required(['username', 'password']));
	router.use(function (req, res, next) {
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
	});

	return router;
};
