import * as User from '../user/user.model';

let router = require('express').Router();
let passport = require('passport');

require('./passport-setup').setup(User);

router.use('/local', require('./local'));

var Auth = router;
export default Auth;