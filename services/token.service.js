const jwt = require('jsonwebtoken');

const ErrorHandler = require('../error/ErrorHandler');

const {
  httpStatusCodes, jwt_config: {
    ACCESS_SECRET_KEY,
    REFRESH_SECRET_KEY,
    ACCESS_EXPIRES_IN,
    REFRESH_EXPIRES_IN
  }
} = require('../config');

module.exports = {
  createUserTokens: (accessExpiresIn = ACCESS_EXPIRES_IN, refreshExpiresIn = REFRESH_EXPIRES_IN) => {
    const access_token = jwt.sign(
      {},
      ACCESS_SECRET_KEY,
      { expiresIn: accessExpiresIn }
    );

    const refresh_token = jwt.sign(
      {},
      REFRESH_SECRET_KEY,
      { expiresIn: refreshExpiresIn }
    );

    return {
      access_token,
      refresh_token
    };
  },

  verifyUserToken: (token, tokenType = 'active') => {
    try {
      const secret = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

      jwt.verify(token, secret);
    } catch (error) {
      throw new ErrorHandler(httpStatusCodes, 'Invalid token');
    }
  }
};
