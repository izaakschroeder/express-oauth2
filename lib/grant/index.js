
'use strict';

module.exports = {
	authorizationCode: require('./authorization-code'),
	clientCredentials: require('./client-credentials'),
	implicit: require('./implicit'),
	password: require('./password'),
	refreshToken: require('./refresh-token')
};
