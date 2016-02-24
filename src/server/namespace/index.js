var router = require('express').Router();
var Namespace = require('./namespace.model');
var auth = require('../auth/auth.service');

router.post('/new', function(req, res) {
	console.log(req.body);
	res.send(200).end();
});
router.get('/:id', auth.isAuthenticated(), function (req, res) {
  var id = req.params.id;

  Namespace.findById(id, function(err, namespace) {
    if (err) {
      return res.status(500).send(err);
    }
    if (!namespace) {
      return res.status(404).end();
    }
    res.json(namespace.info);
  });

});
module.exports = router;
