const router = require('express').Router();

const { authController } = require('../controllers');

const { authMiddleware, isReqBodyValid } = require('../middlewares');

const { auth } = require('../validators');

router.post('/signin', [
  isReqBodyValid(auth.signInValidator),
  authMiddleware.isCredentialsCorrect
], authController.signIn);

router.post('/signout', [
  isReqBodyValid(auth.signOutValidator),
  authMiddleware.isTokenExist()
], authController.signOut);

router.post('/refresh', [
  isReqBodyValid(auth.renewTokensByRefresh),
  authMiddleware.isTokenExist('refresh')
], authController.renewTokensByRefresh);

module.exports = router;
