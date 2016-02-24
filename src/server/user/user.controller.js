'use strict';
var UserController = module.exports = {};

var User = require('./user.model');
var passport = require('passport');
var config = require('../config');
var jwt = require('jsonwebtoken');

function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function(err) {
        console.log('validationError', err, err.stack);
        res.status(statusCode).json(err);
    }
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
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
    console.log('Saving newUser', newUser);
    newUser.save(function(err, user, numAffected) {
        if (err) {
            return res.status(500).send(err);
        }
        var token = jwt.sign({
            _id: user._id
        }, config.sessionSecret, {
            expiresIn: 60 * 60 * 5
        });

        res.json({
            token: token
        })
    });
};

/**  
 * Get a single user
 */
UserController.show = function show(req, res, next) {
    var userId = req.params.id;

    User.findById(userId, function(err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!user) {
            return res.status(404).end();
        }
        res.json(user.profile);
    });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
UserController.destroy = function destroy(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(204).end();
    });
};

/**
 * Change a users password
 */
UserController.changePassword = function changePassword(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findById(userId, function(err, user) {
        if (err) {
            return res.status(500).end();
        }
        if (user.authenticate(oldPass)) {
            return user.save(function(err) {
                if (err) {
                    return res.status(500).end();
                }
                res.status(204).end();
            });
        }
        else {
            return res.status(403).end();
        }
    });
};

/**
 * Add namespace to user
 */
UserController.addNamespace = function addNamespace(req, res, next) {
  var userId = req.user._id;
  var namespace = req.body;
  User.findByIdAndUpdate(userId,
    {$push: {"namespace": namespace}},
    {safe: true, upsert: true},
    function (err, data) {
      console.log(err);
    }
  );
};

/**
 * Get my info
 */
UserController.me = function me(req, res, next) {
    var userId = req.user._id;
    User.findOne({
        _id: userId
    }, '-salt -password', function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).end();
        }
        res.json(user);
    });
};

/**
 * Authentication callback
 */
UserController.authCallback = function authCallback(req, res, next) {
    res.redirect('/');
};
