
var async = require('express-async'),
	util = require('../util'),
	required = util.required;


module.exports = function authorize(options) {

	var router = express.Router();

	required(['response_type', 'client_id', 'redirect_uri']),

	function foo(req, res, next) {
		//If the client omits the scope parameter when requesting
		// authorization, the authorization server MUST either process the
		// request using a pre-defined default value or fail the request
		// indicating an invalid scope. The authorization server SHOULD
		// document its scope requirements and default value (if defined).
		if (!req.query.scope) {
			scope = options.defaultScope;
		} else {
			scope = req.query.scope.split(' ');
		}

		var invalid = _.difference(scope, options.scope);

		if (invalid.length > 0) {

		}

		// The authorization server MAY fully or partially ignore the scope
		// requested by the client, based on the authorization server policy or
		// the resource owner's instructions.  If the issued access token scope
		// is different from the one requested by the client, the authorization
		// server MUST include the "scope" response parameter to inform the
		// client of the actual scope granted.
	}

	// Check if local user is logged in
	// No -> Redirect to login (return url = this url)
	// Check if client_id is valid
	// Check if redirect_uri is allowed
	// Check if response_type is servicable (e.g. "code")
	// Parse out list of desired scopes
	// Check if client is already authorized to access those scopes
	// Yes -> Redirect to redirect_uri with token
	// No -> Redirect to authorization page that allows the user to
	// authorize scopes for the client (return url = this url)


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

	return async.series();

};
