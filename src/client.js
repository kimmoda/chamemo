'use strict';

var rest = require('rest');
var defaultRequest = require('rest/interceptor/defaultRequest');
var mime = require('rest/interceptor/mime');
var errorCode = require('rest/interceptor/errorCode');

module.exports = rest
		.wrap(mime)
		.wrap(errorCode)
		.wrap(defaultRequest, { headers: { 'Accept': 'application/json', 'APIKEY': '6a0d6c3dbfbd443aa5fea58c4b612c5b' }});
