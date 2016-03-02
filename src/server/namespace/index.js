var router = require('express').Router();
var Namespace = require('./namespace.model');
var User = require('../user/user.model');
var auth = require('../auth/auth.service');

router.post('/new', function (req, res) {
  var data = {
    name: req.body.name,
    content: []
  };
  var newNamespace = new Namespace(data);
  console.log(req.body);
  console.log(newNamespace.id);
  data.id = newNamespace.id;
  res.json(data);
  //res.sendStatus(200).end();
});


router.get('/:id', function (req, res) {
  var id = req.params.id;

  Namespace.findById(id, function (err, namespace) {
    if (err) {
      return res.status(500).send(err);
    }
    if (!namespace) {
      return res.status(404).end();
    }
    res.json(namespace.info);
  });
});

router.get('/get-all', function (req, res) {
  Namespace.find({}, function (err, namespaces) {
    console.log('namespaces', namespaces);
    res.send(namespaces);
  })
});

router.post('/update-content', function (req, res) {
  var data = req.body;
  console.log(data);
  Namespace.findByIdAndUpdate(data.id, {
      $set: {
        name: data.name,
        content: data.content
      }
    },
    function (err, data) {
      console.log(err, data);
    });
  res.sendStatus(200).end();
});

module.exports = router;
