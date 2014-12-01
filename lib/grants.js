
'use strict';

var express = require('express'),
	required = require('./util').required;

/**
 * Create OAuth grant middleware.
 * @param {Object} options Configuration options.
 * @param {Object} options.grants List of supported grants and handlers.
 * @param {Function} options.token Used for generating tokens.
 * @returns {Function} Grant middleware.
 */
module.exports = function grants(options) {

	var router = express.Router();

	router.use(required(['grant_type']));

	router.use(function(req, res, next) {
		return next(req.body.grant_type !== name ? 'route' : null);
	});

	return router;
};
