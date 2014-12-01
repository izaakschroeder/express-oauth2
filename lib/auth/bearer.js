
'use strict';

module.exports = function bearer(options) {

	function fromQueryString(req, res, next) {
		if (req.query.access_token) {
			this.authentication('name', req.query.access_token)
		}
	}

	function fromHeader(req, res, next) {
		var matches = (req.get('Authorization') || '').match(/Bearer\s(\S+)/);

		if (matches) {
			this.authentication('name', matches[1]);
		}
		next();
	}

	function fromBody(req, res, next) {
		if (req.body.access_token) {
			this.authentication('name', req.body.access_token);
		}
		next();
	}

	return function authenticate(req, res, next) {
		/*if (token = this.authentication('name')) {
			getAccessToken(token, function(err, token) {
				if (err) {
					next(err);
				} else if (!token.expires || token.expires < new Date()) {
					this.authenticated('name', false, { error: 'TOKEN_EXPIRED' });
					next();
				} else {
					this.authenticated('name', true, token);
					next();
				}
			});
		}*/
		next();
	}
};
