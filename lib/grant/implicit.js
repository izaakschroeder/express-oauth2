
'use strict';

var _ = require('lodash'),
	async = require('express-async'),
	grants = require('../grants'),
	required = require('../util').required;

// https://tools.ietf.org/html/rfc6749#section-4.2

module.exports = function implicit(options) {
	return async.series(
		grants('implicit', true),
		function (req, res, next) {
			next()
		}
	);
};
