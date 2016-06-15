import Namespace from './namespace.model';
import Auth from '../auth/auth.service';
import Util from '../api-util';

let router = require('express').Router();
let mongoose = require('mongoose');

function save(res, namespace) {
  namespace.save((err, namespace) => {
    if (err) return Util.handleError(res);
    res.status(200).json(namespace);
  });
}

router.post('/', Auth.isAuthenticated(), (req, res) => {
  var data = {
    name: req.body.name,
    content: [],
    users: [req.user._id]
  };
  var newNamespace = new Namespace(data);
  save(res, newNamespace);
});


router.get('/:id', (req, res) => {
  var id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(500).send('Invalid ID');
  }
  
  Namespace.findById(id, (err, namespace) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!namespace) {
      return res.status(404).end();
    }
    res.json(namespace);
  });
});

router.get('/', Auth.isAuthenticated(), (req, res) => {
  Namespace.find({
    'users': req.user._id
  }, (err, namespaces) => {
    res.send(namespaces);
  });
});
router.post('/:id/content/', Auth.isAuthenticated(), (req, res) => {
  var data = req.body;
  console.log('Request received!', JSON.stringify(req.body), JSON.stringify(req.params));
  if (!data.key || data.key.trim() === '') {
    return Util.validationError(res);
  }
  Namespace.findById(req.params.id, (err, namespace) => {
    if (err) return Util.handleError(res);
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

var Namespace = router;
export default Namespace;


