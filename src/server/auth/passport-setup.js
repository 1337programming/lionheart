var passportSetup = module.exports = {};
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function localAuthenticate(User, email, password, done) {
  User.findOne({
    email: email.toLowerCase()
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        message: 'This email is not registered.'
      })
    }
    console.log('User, email', email, password);
    user.authenticate(password, function(authError, authenticated) {
      console.log(authError, authenticated);
      if (authError) {
        return done(authError);
      }
      if (!authenticated) {
        return done(null, false, {message: 'This password is not correct.'});
      }
      else {
        return done(null, user);
      }
    });
  });
}

passportSetup.setup = function(User) {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function(email, password, done) {
		return localAuthenticate(User, email, password, done);
	}));
};