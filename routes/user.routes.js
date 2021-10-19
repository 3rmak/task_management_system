const router = require('express').Router();

const { userControllers } = require('../controllers');

router.get('/', userControllers.getAllUsers);

router.post('/', userControllers.postUser);

router.get('/:userId', userControllers.getUserById);

router.patch('/:userId', userControllers.patchUserById);

router.delete('/:userId', userControllers.deleteUserById);

module.exports = router;
