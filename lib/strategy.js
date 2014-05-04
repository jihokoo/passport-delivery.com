var uri = require('url')
  , util = require('util')
  , OAuth2Strategy = require('passport-oauth2')
  , InternalOAuthError = require('passport-oauth2').InternalOAuthError;


function Strategy(options, verify){
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://api.delivery.com/third_party/authorize';
  options.tokenURL = options.tokenURL || 'https://api.delivery.com/third_party/access_token';
  options.scopeSeparator = options.scopeSeparator || ',';
  console.log(options);
  OAuth2Strategy.call(this, options, verify);
  this.name = 'delivery';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);



/**
 * Authenticate request by delegating to a service provider using OAuth 2.0.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req, options) {

  // When a user denies access to your app, delivery.com redirects to a url containing
  // an 'error' query parameter describing the error:
  // https://myexampleapp.com/oauth?error=user+denied+access
  if (req.query && req.query.error) {
    return this.fail();
  }
  // Call the base class for standard OAuth2 authentication.
  OAuth2Strategy.prototype.authenticate.call(this, req, options);
};



/**
 * Return extra Devlivery.com-specific parameters to be included in the user
 * authorization request.
 *
 * @param {Object} options
 * @return {Object}
 * @api protected
 */
Strategy.prototype.authorizationParams = function(options){
  console.log('inputting authorization Params', options)
  var params = {};
  if(options.client_id)
    params.client_id = options.client_id;
  if(options.client_secret)
    params.client_secret = options.client_secret;
  if(options.grant_type)
    params.grant_type = options.grant_type;
  if(options.state)
    params.state = options.state;
  if(options.callbackURL)
    params.callbackURL = options.callbackURL;
  return params
}

/**
 * Expose `Strategy`.
 */
module.exports = Strategy;