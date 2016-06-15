var AuthService:any = {};

import * as User from '../user/user.model';
import config from '../config';

let passport = require('passport');
let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
let compose = require('composable-middleware');

var validateJwt = expressJwt({
  secret: config.sessionSecret
});

AuthService.isAuthenticated = () => {
  return compose()
  // Validate jwt
    .use((req, res, next) => {
      // allow access_token to be passed through query parameter as well
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use((req, res, next) => {
      User.findById(req.user._id, (err, user) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res.status(401).end();
        }
        req.user = user;
        next();
      });
    });
};

AuthService.hasRole = (roleRequired) => {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(AuthService.isAuthenticated())
    .use((req, res, next) => {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
};

AuthService.signToken = (id, role) => {
  return jwt.sign({
    _id: id,
    role: role
  }, config.sessionSecret, {
    expiresIn: 60 * 60 * 5
  });
};

AuthService.setTokenCookie = (req, res) => {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.');
  }
  var token = AuthService.signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
};

export default AuthService;