var passportSetup:any = {};
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

function localAuthenticate(User, email, password, done) {
  User.findOne({
    email: email.toLowerCase()
  }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        message: 'This email is not registered.'
      });
    }
    console.log('User, email', email, password);
    user.authenticate(password, (authError, authenticated) => {
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

passportSetup.setup = (User) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    return localAuthenticate(User, email, password, done);
  }));
};

export default passportSetup;