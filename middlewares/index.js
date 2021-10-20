module.exports = {
  authMiddleware: require('./auth.middleware'),
  taskMiddleware: require('./task.middleware'),
  userMiddleware: require('./user.middleware'),

  // general
  isReqBodyValid: require('./isReqBodyValid')
};
