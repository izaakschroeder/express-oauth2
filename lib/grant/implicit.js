
'use strict';

var _ = require('lodash'),
	express = require('express'),
	grants = require('../grants'),
	required = require('../util').required;

// https://tools.ietf.org/html/rfc6749#section-4.2

module.exports = function implicit(options) {
	var router = express.Router();
	router.use(grants('implicit', true));
	router.use(function (req, res, next) {
		next()
	});
	return router;
};
