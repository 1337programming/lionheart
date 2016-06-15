import UserController from './user.controller';
import Auth from '../auth/auth.service';

let router = require('express').Router();

router.get('/', Auth.hasRole('admin'), UserController.index);
router.delete('/:id', Auth.hasRole('admin'), UserController.destroy);
router.get('/me', Auth.isAuthenticated(), UserController.me);
router.put('/:id/password', Auth.isAuthenticated(), UserController.changePassword);
router.get('/:id', Auth.isAuthenticated(), UserController.show);
router.post('/', UserController.create);

var User = router;
export default User;