
/*
var options = _.extend({
	accessTokenLifetime: 3600,
	refreshTokenLifetime: 1209600,
	authCodeLifetime: 30,
	grants: [ ],

	getAccessToken: ...,

});*/

'use strict';

module.exports = {
	auth: require('./auth'),
	grants: require('./grants'),
	grant: require('./grant'),
	endpoint: require('./endpoint'),
	client: require('./client')
};
