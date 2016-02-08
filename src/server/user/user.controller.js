'use strict';
var UserController = module.exports = {};

var User = require('./user.model');
var passport = require('passport');
var config = require('../config');
var jwt = require('jsonwebtoken');

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function(err) {
        res.status(statusCode).json(err);
    }
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        console.log(err);
        res.status(statusCode).send(err);
    };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
UserController.index = function index(req, res) {
    User.find({}, '-salt -password')
        .then(function(users) {
            res.status(200).json(users);
        })
        .catch(handleError(res));
};

/**
 * Creates a new user
 */
UserController.create = function create(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.saveAsync()
        .spread(function(user) {
            var token = jwt.sign({
                _id: user._id
            }, config.sessionSecret, {
                expiresIn: 60 * 60 * 5
            });
            res.json({
                token
            });
        })
        .catch(validationError(res));
};

/**
 * Get a single user
 */
UserController.show = function show(req, res, next) {
    var userId = req.params.id;

    User.findByIdAsync(userId)
        .then(user => {
            if (!user) {
                return res.status(404).end();
            }
            res.json(user.profile);
        })
        .catch(err => next(err));
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
UserController.destroy = function destroy(req, res) {
    User.findByIdAndRemoveAsync(req.params.id)
        .then(function() {
            res.status(204).end();
        })
        .catch(handleError(res));
};

/**
 * Change a users password
 */
UserController.changePassword = function changePassword(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findByIdAsync(userId)
        .then(user => {
            if (user.authenticate(oldPass)) {
                user.password = newPass;
                return user.saveAsync()
                    .then(() => {
                        res.status(204).end();
                    })
                    .catch(validationError(res));
            } else {
                return res.status(403).end();
            }
        });
};

/**
 * Get my info
 */
UserController.me = function me(req, res, next) {
    var userId = req.user._id;

    User.findOneAsync({
            _id: userId
        }, '-salt -password')
        .then(user => { // don't ever give out the password or salt
            if (!user) {
                return res.status(401).end();
            }
            res.json(user);
        })
        .catch(err => next(err));
};

/**
 * Authentication callback
 */
UserController.authCallback = function authCallback(req, res, next) {
    res.redirect('/');
};
