// Copyright (c) Yaosee Software Technologies.  All rights reserved.
// Licensed under the Apache License, Version 2.0.  See License.txt in the project root for license information.

/*global module, require*/

var checkArgs = require('cordova/argscheck').checkArgs;

var bridge = require('./CordovaBridge');
var Deferred = require('./utility').Utility.Deferred;
var AuthenticationResult = require('./AuthenticationResult');
var TokenCache = require('./TokenCache');

/**
 * Constructs context to use with known authority to get the token. It reuses existing context
 * for this authority URL in native proxy or creates a new one if it doesn't exist.
 * Corresponding native context will be created at first time when it will be needed.
 *
 * @param   {String}  tenantId          MS b2c tenant id
 * @param   {String}  clientId          MS b2c client id
 * @param   {String}  redirectUrl       MS b2c redirect url
 * @returns {Object}  Newly created authentication context.
 */
function AuthenticationContext(tenantId, clientId, redirectUrl) {

    checkArgs('sss', 'AuthenticationContext', arguments);

    this.tenantId = tenantId;
    this.clientId = clientId;
    this.redirectUrl = redirectUrl;
    this.tokenCache = new TokenCache(this);
}

/**
 * Acquires token using interactive flow, by sign in or sign up.
 * It always shows UI and skips token from cache.
 *
 * @param   {String}  policy   Resource identifier
 * @param   {String}  scope    Client (application) identifier
 * @param   {String}  userId   Optional login hint. This will determine if we are directed to sign in or sign up.
 *
 * @returns {Promise} Promise either fulfilled with AuthenticationResult object or rejected with error
 */
AuthenticationContext.prototype.acquireTokenAsync = function (policy, scope, userId) {

    checkArgs('ssS', 'AuthenticationContext.acquireTokenAsync', arguments);

    var d = new Deferred();

    bridge.executeNativeMethod('acquireTokenAsync', [this.tenantId, this.clientId, this.redirectUrl,
                                                     policy, scope, userId])
    .then(function(authResult){
        d.resolve(new AuthenticationResult(authResult));
    }, function(err) {
        d.reject(err);
    });

    return d;
};

/**
 * Redirects a user for editing his or her profile.
 * @param {String} policy
 */
AuthenticationContext.prototype.editProfileAsync = function (policy) {
    checkArgs('s', 'AuthenticationContext.editProfileAsync', arguments);    
};

/**
 * Logouts a user
 * @param {String} policy
 * @returns {Promise} 
 */
AuthenticationContext.prototype.logoutAsync = function (policy, scope) {
    checkArgs('ss', 'AuthenticationContext.logoutAsync', arguments);

    var d = new Deferred();

    bridge.executeNativeMethod('logoutAsync', [this.tenantId, this.clientId, this.redirectUrl, 
                                               policy, scope])
    .then(function(res){
        d.resolve(res);
    }, function(err) {
        d.reject(err);
    });

    return d;
    
};


module.exports = AuthenticationContext;
