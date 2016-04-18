var router = require('express').Router();
var Namespace = require('./namespace.model');
var User = require('../user/user.model');
var auth = require('../auth/auth.service');
var mongoose = require('mongoose');
var handleError = require('../api-util').handleError;
var validationError = require('../api-util').validationError;
function save(res, namespace) {
    namespace.save(function(err, namespace) {
        if (err) return handleError(res);
        res.status(200).json(namespace);
    });
}

router.post('/', auth.isAuthenticated(), function(req, res) {
    var data = {
        name: req.body.name,
        content: [],
        users: [req.user._id]
    };
    var newNamespace = new Namespace(data);
    save(res, newNamespace);
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
        res.json(namespace);
    });
});

router.get('/', auth.isAuthenticated(), function(req, res) {
    Namespace.find({
        'users': req.user._id
    }, function(err, namespaces) {
        res.send(namespaces);
    });
});
router.post('/:id/content/', auth.isAuthenticated(), function(req, res) {
    var data = req.body;
    console.log('Request received!', JSON.stringify(req.body), JSON.stringify(req.params));
    if (!data.key || data.key.trim() === '') {
        return validationError(res);
    }
    Namespace.findById(req.params.id, function(err, namespace) {
       if (err) return handleError(res);
        var curDate = new Date();
        console.log('Creating content');
        namespace.content.push({
            key: data.key,
            value: data.value || '',
            description: data.description || '',
            createdDate: curDate,
            creator: req.user._id,
            modifiedDate: curDate,
            modifier: req.user._id
        });
        save(res, namespace);
    });
});

module.exports = router;


