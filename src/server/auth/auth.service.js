var authService = module.exports = {};
var passport = require('passport');
var config = require('../config');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../user/user.model');
var argv = require('yargs').argv;

var validateJwt = expressJwt({
    secret: config.sessionSecret
});

authService.isAuthenticated = function isAuthenticated() {
    return compose()
        // Validate jwt
        .use(function(req, res, next) {
            // allow access_token to be passed through query parameter as well
            if (req.query && req.query.hasOwnProperty('access_token')) {
                req.headers.authorization = 'Bearer ' + req.query.access_token;
            }
            validateJwt(req, res, next);
        })
        // Attach user to request
        .use(function(req, res, next) {
            User.findByIdAsync(req.user._id)
                .then(user => {
                    if (!user) {
                        return res.status(401).end();
                    }
                    req.user = user;
                    next();
                })
                .catch(err => next(err));
        });
};

authService.hasRole = function hasRole(roleRequired) {
    if (!roleRequired) {
        throw new Error('Required role needs to be set');
    }

    return compose()
        .use(authService.isAuthenticated())
        .use(function meetsRequirements(req, res, next) {
            if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
                next();
            } else {
                res.status(403).send('Forbidden');
            }
        });
};

authService.signToken = function signToken(id, role) {
    return jwt.sign({
        _id: id,
        role: role
    }, config.sessionSecret, {
        expiresIn: 60 * 60 * 5
    });
};

authService.setTokenCookie = function setTokenCookie(req, res) {
    if (!req.user) {
        return res.status(404).send('It looks like you aren\'t logged in, please try again.');
    }
    var token = authService.signToken(req.user._id, req.user.role);
    res.cookie('token', token);
    res.redirect('/');
};
