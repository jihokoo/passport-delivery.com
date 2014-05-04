# Passport-Delivery.com-OAuth

[Passport](http://passportjs.org/)strategies for authenticating with[Delivery.com](https://www.delivery.com/) using OAuth 2.0

This module lets you authenticate using Delivery.com in your Node.js applications.
By plugging into Passport, Delivery.com authentication can be easily and unovtrusively  integrated into any application or framework that supports [Connect](http://senchalabs.org/connect/)-style middleware, including [Express](http://expressjs.com/).

## Intall
    $ npm install passport-delivery.com

## Usage of OAuth 2.0

#### Configure Strategy

The Delivery.com OAuth 2.0 authentication strategy authenicates users using a Delivery.com
account and OAuth 2.0 tokens. The strategy requires a `verify` callback, which accepts those credentials
and calls `done` providing a user, as well as `options` specifying a `clientID`, `clientSecret`, and `callbackURL`.
    
    var DeliveryStrategy = require('passport-delivery.com').Strategy;

    passport.use(new DeliveryStrategy({
      clientID: Delivery_CLIENT_ID,
      clientSecret: Delivery_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3000/auth/delivery/callback'
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOne({ accessToken: accessToken }, function(err, user){
          if(err) return err;
          if(!user){
            var u = new User({
              accessToken: accessToken
            });
            u.save(function(err){
              return done(err, u);
            });
          } else{
            user.save(function(err){
              return done(err, user);
            });
          }
        });
      }
    ));

#### Important: The `profile` Object
Currently, Delivery.com does not support further queries to obtain personal information (fullName, userName, email) on the user via the conventional /v1/me endpoint. The `profile` object returned above is empty. The strategy will be updated to include personal information if Delivery.com updates their API to support to retrive user information. Actions can be made on behalf of the user in session by making queries with the accessToken in the Authorization HTTP header.

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'delivery'` strategy, to authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/delivery', function(req, res, next){
      req.session.state = crypto.randomBytes(32).toString('hex');
      passport.authenticate('delivery', {
        state: req.session.state
      })(req, res, next);
      }, users.signin);

    app.get('/auth/delivery/callback', 
      passport.authenticate('delivery', { failureRedirect: '/login'}), 
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

- Coming soon


## Credits

  - [Ji Ho Koo](http://github.com/jihokoo)

## Thanks
  - [Jared Hanson](https://github.com/jaredhanson)


## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014-2015









