const express = require('express');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config();

const { backendDeploy: { BACKEND_PORT }, httpStatusCodes, dbDeploy } = require('./config');

const { taskRoutes, userRoutes } = require('./routes');

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.use(_MainErrorHandler);

app.get('/health', (req, res) => res.send('ALIVE'));

mongoose.connect(dbDeploy.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('database connected successfully'))
  .catch((e) => console.log('Error', e.message));

app.listen(BACKEND_PORT, () => {
  console.log(`server started successfully on port ${BACKEND_PORT}`);
});

// eslint-disable-next-line no-unused-vars
function _MainErrorHandler(err, req, res, next) {
  res
    .status(err.status || httpStatusCodes.Internal_Server_Error)
    .json({
      message: (err.message || 'Unknown err')
    });
}
