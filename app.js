const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

require('dotenv').config();

const { backendDeploy: { BACKEND_PORT }, httpStatusCodes, dbDeploy } = require('./config');

const { authRoutes, taskRoutes, userRoutes } = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.use(_MainErrorHandler);

app.get('/health', (req, res) => res.send('ALIVE'));

mongoose.connect(dbDeploy.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('database connected successfully'))
  .catch((e) => console.log('Error', e));

app.listen(BACKEND_PORT, '0.0.0.0', () => {
  console.log(`server started successfully on port ${BACKEND_PORT}
  ${process.env.BROADCAST_PASS},
  ${process.env.MAIL_REG_SUBMIT_TEMPLATE},
  ${process.env.BROADCAST_EMAIL},
  ${process.env.PORT},
  ${process.env.BACKEND_IP_ADDRESS},
  ${process.env.ENV},
  `);
});

// eslint-disable-next-line no-unused-vars
function _MainErrorHandler(err, req, res, next) {
  res
    .status(err.status || httpStatusCodes.Internal_Server_Error)
    .json({
      message: (err.message || 'Unknown err')
    });
}
