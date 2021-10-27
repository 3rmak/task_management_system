module.exports = {
  ACCESS_SECRET_KEY: process.env.ACCESS_SECRET_KEY || 'word',
  REFRESH_SECRET_KEY: process.env.REFRESH_SECRET_KEY || 'word',

  ACCESS_EXPIRES_IN: '15m',
  REFRESH_EXPIRES_IN: '30d'
};
