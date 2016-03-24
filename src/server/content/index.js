var router = require('express').Router();
var Content = require('./content.model');
var User = require('../user/user.model');
var auth = require('../auth/auth.service');
var mongoose = require('mongoose');

router.post('/new', auth.isAuthenticated(), function(req, res) {
	var date = new Date();
    var newContent = new Content({
        key: req.body.key,
        value: req.body.value,
        createdDate: date,
        creator: req.user._id,
        modifiedDate: date,
        modifier: req.user._id,
        description: req.body.description
    });
    newContent.save(function(err, content, numAffected) {
        if (err) {
            return res.status(500).send(err);
        }

        res.json(content);
    });
});


router.get('/:id', function(req, res) {
    var id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(500).send('Invalid ID');
    }

    Content.findById(id, function(err, content) {
        if (err) {
            return res.status(500).send(err);
        }
        if (!content) {
            return res.status(404).end();
        }
        res.json(content);
    });
});

router.get('/', auth.isAuthenticated(), function(req, res) {
    Content.find({
        'users': req.user._id
    }, function(err, namespaces) {
        res.send(namespaces);
    })
});

router.post('/update-content', function(req, res) {
    var data = req.body;
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
