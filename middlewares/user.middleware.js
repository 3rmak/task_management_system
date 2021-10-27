const { User } = require('../models');
const ErrorHandler = require('../error/ErrorHandler');
const { httpStatusCodes } = require('../config');

module.exports = {
  isUserExist: (async (req, res, next) => {
    try {
      const { _id } = req.locals.token.user;

      const user = await User.findById(_id);

      if (!user) {
        next(new ErrorHandler(httpStatusCodes.Bad_Request, 'Token has no related user'));
      }

      req.locals = {
        ...req.locals,
        user
      };

      next();
    } catch (e) {
      next(e);
    }
  })
};
