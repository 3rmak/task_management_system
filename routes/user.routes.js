const router = require('express').Router();

const { userControllers } = require('../controllers');

const { isReqBodyValid } = require('../middlewares');

const { user } = require('../validators');

router.get('/', userControllers.getAllUsers);

router.post('/', [
  isReqBodyValid(user.userCreateValidator)
], userControllers.postUser);

router.get('/:userId', userControllers.getUserById);

router.patch('/:userId', userControllers.patchUserById);

router.delete('/:userId', userControllers.deleteUserById);

module.exports = router;
