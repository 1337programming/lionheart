var router = require('express').Router();
var Namespace = require('./namespace.model');
var auth = require('../auth/auth.service');

router.post('/new', function(req, res) {
  var data = {
    name: req.body.name,
    content: [],
    permissions: []
  };
  var newNamespace = new Namespace(data);
	console.log(req.body);
  console.log(newNamespace.id);
	res.sendStatus(200).end();
});
router.get('/:id', function (req, res) {
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

router.get('get-name/:name', function (req, res) {
  var name = req.params.name;

  Namespace.findByName('name', function (err, namespaces) {
    if (err) {
      return res.status(500).send(err);
    }
    if (!namespaces) {
      return res.status(404).end();
    }
    res.json(namespaces);
  });
});
module.exports = router;
