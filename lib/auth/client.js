
'use strict';

module.exports = function client(options) {

	

	return function (req, res, next) {
		if (!_.has(req.body, 'client_id')) {
			next();
		} else if (!_.has(req.body, 'client_secret')) {
			next({ statusCode: 400, error: 'MISSING_SECRET' });
		} else {
			var auth = {
				clientId: req.body.client_id,
				clientSecret: req.body.client_secret
			};

			req.authentication('xxx', auth);

			authenticate(auth, function(err, result, principal) {
				if (err) {
					next(err);
				} else {
					req.authenticated('xxx', result, principal);
					next();
				}
			});
		}
	};
};
