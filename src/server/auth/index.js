var router = require('express').Router();
var passport = require('passport');
var User = require('../user/user.model');

require('./passport-setup').setup(User);

router.use('/local', require('./local'));

module.exports = router;