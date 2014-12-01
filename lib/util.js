
var _ = require('lodash'),
	url = require('url'),
	crypto = require('crypto');

/**
 * Generate a secure, random token string.
 * @param {Function} callback Called with error or resulting token.
 * @returns void
 */
function token(callback) {
	crypto.randomBytes(256, function (err, buffer) {
		if (err) {
			callback(err);
		} else {
			var token = crypto
				.createHash('sha1')
				.update(buffer)
				.digest('hex');
			callback(null, token);
		}
	});
}

function buildUrl(input, query) {
	if (_.isString(input)) {
		input = url.parse(input);
	}
	return _.assign({ }, input, {
		query: _.assign({ }, input.query || { }, query)
	});
}

function required(options) {
	return function (req, res, next) {
		var required = [ 'username', 'password' ];
		var missing = _.difference(required, _.keys(req.body || { }));
		if (missing.length > 0) {
			next({
				statusCode: options.statusCode || 400,
				error: 'MISSING_PARAMETERS',
				missing: missing
			});
		} else {
			next();
		}
	}
}


module.exports = {
	token: token,
	url: buildUrl,
	required: required
};
