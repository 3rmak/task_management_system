const bcrypt = require('bcrypt');

const ErrorHandler = require('../error/ErrorHandler');

const { httpStatusCodes, passwordHash: { SALT_ROUNDS } } = require('../config');

module.exports = {
  hash: (password) => bcrypt.hash(password, SALT_ROUNDS),

  isPassMatch: async (passwordFromRequest, hashedPass) => {
    try {
      const isMatch = await bcrypt.compare(passwordFromRequest, hashedPass);

      if (!isMatch) {
        throw new ErrorHandler(httpStatusCodes.Unauthorized, 'Bad credentials');
      }
    } catch (e) {
      throw new ErrorHandler(httpStatusCodes.Internal_Server_Error, `error ${e.message}`);
    }
  }
};
