var router = require('express').Router();
var auth = require('../auth/auth.service');

router.post('/new', function(req, res) {
	console.log(req.body);
	res.send(200).end();
});
module.exports = router;
