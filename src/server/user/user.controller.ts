'use strict';
import Util from '../api-util';
import config from '../config';
import * as User from './user.model';

var UserController:any = {};
let jwt = require('jsonwebtoken');

/**
 * Get list of users
 * restriction: 'admin'
 */
UserController.index = (req, res) => {
  User.find({}, '-salt -password')
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(Util.handleError(res));
};

/**
 * Creates a new user
 */
UserController.create = (req, res, next) => {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save((err:any, user, numAffected) => {
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
UserController.show = (req, res, next) => {
  var userId = req.params.id;
  
  User.findById(userId, (err, user) => {
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
UserController.destroy = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(204).end();
  });
};

/**
 * Change a users password
 */
UserController.changePassword = (req, res, next) => {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);
  
  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).end();
    }
    if (user.authenticate(oldPass)) {
      return user.save((err) => {
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
 * Get my info
 */
UserController.me = (req, res, next) => {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -password', (err, user) => {
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
UserController.authCallback = (req, res, next) => {
  res.redirect('/');
};

export default UserController;
