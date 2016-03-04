var router = require('express').Router();
var Namespace = require('./namespace.model');
var User = require('../user/user.model');
var auth = require('../auth/auth.service');
var mongoose = require('mongoose');

router.post('/new', function(req, res) {
    var data = {
        name: req.body.name,
        content: []
    };
    var newNamespace = new Namespace(data);
    newNamespace.save(function(err, namespace, numAffected) {
        if (err) {
            return res.status(500).send(err);
        }

        res.json(namespace);
    });
});


router.get('/:id', function(req, res) {
    var id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(500).send('Invalid ID');
    }

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

router.get('/', function(req, res) {
    Namespace.find({}, function(err, namespaces) {
        console.log('namespaces', namespaces);
        res.send(namespaces);
    })
});

router.post('/update-content', function(req, res) {
    var data = req.body;
    console.log(data);
    Namespace.findByIdAndUpdate(data.id, {
            $set: {
                name: data.name,
                content: data.content
            }
        },
        function(err, data) {
            console.log(err, data);
        });
    res.sendStatus(200).end();
});

module.exports = router;
