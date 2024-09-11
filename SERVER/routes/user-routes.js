const express = require('express');
const router = express.Router();
const controllers = require('../controllers/user-controllers');

router.get('/', controllers.getUsers);
router.get('/:id', controllers.getUsersById);
router.post('/signup', controllers.userSignup);
router.post('/login', controllers.loginUser);
router.patch('/:id', controllers.patchUsers);
router.delete('/', controllers.deleteAllUsers);
router.delete('/:id', controllers.deleteUserById);

module.exports = router;
