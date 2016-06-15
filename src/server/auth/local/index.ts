import AuthService from '../auth.service';

let router = require('express').Router();
let passport = require('passport');
var signToken = AuthService.signToken;

router.post('/', (req, res, next) => {
  console.log('Received request!!', req.body, JSON.stringify(req.body));
  passport.authenticate('local', (err, user, info) => {
    console.log(err, user,info);
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(404).json({message: 'Something went wrong, please try again.'});
    }

    var token = signToken(user._id, user.role);
    res.json({ token: token });
  })(req, res, next)
});

var LocalAuth = router;
export default LocalAuth;
