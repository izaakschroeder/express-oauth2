
var express = require('express'),
	util = require('../util'),
	required = util.required;


module.exports = function authorize(options) {

	var router = express.Router();

	required(['response_type', 'client_id', 'redirect_uri']),

	function foo(req, res, next) {

	}

	function tokenRedirect(req, res, next) {

		var to = url.format(buildUrl(redirectUrl, {
			code: token.key,
			state: req.query.state || ''
		}));

		res.redirect(to);

		next();
	}

	function errorRedirect(err, req, res, next) {

		var to = url.format(buildUrl(redirectUrl, {
			error: error.error,
			code: error.code
		}));

		res.redirect(to);

		next(err);
	}

	router.use(tokenRedirect);
	router.use(errorRedirect);

	return router;

};
