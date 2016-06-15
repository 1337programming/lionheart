import ContentModel from './content.model';
import Namespace from '../namespace/namespace.model';
import AuthService from '../auth/auth.service';

let router = require('express').Router();
let mongoose = require('mongoose');

router.get('/:id', (req, res) => {
  var id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(500).send('Invalid ID');
  }
  
  ContentModel.findById(id, (err, content) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!content) {
      return res.status(404).end();
    }
    res.json(content);
  });
});

router.get('/', AuthService.isAuthenticated(), (req, res) => {
  ContentModel.find({
    'users': req.user._id
  }, (err, namespaces) => {
    res.send(namespaces);
  })
});

router.post('/update-content', (req, res) => {
  var data = req.body;
  Namespace.findByIdAndUpdate(data.id, {
      $set: {
        name: data.name,
        content: data.content
      }
    },
    (err, data) => {
      console.log(err, data);
    });
  res.sendStatus(200).end();
});

var Content = router;
export default Content;
