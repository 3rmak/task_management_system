const router = require('express').Router();

const { taskControllers } = require('../controllers');

const { authMiddleware, userMiddleware, isReqBodyValid } = require('../middlewares');

const { task } = require('../validators');

router.use('/', [
  authMiddleware.isTokenExist(),
  userMiddleware.isUserExist
]);
router.use('/:userId', [
  authMiddleware.isTokenExist(),
  userMiddleware.isUserExist
]);

router.get('/', taskControllers.getAllTasks);

router.post(
  '/',
  [
    isReqBodyValid(task.taskCreateValidator),
  ],
  taskControllers.postTask
);

router.get('/:taskId', taskControllers.getTaskById);

router.patch('/:taskId',
  [
    isReqBodyValid(task.taskEditValidator)
  ],
  taskControllers.patchTask);

router.delete('/:taskId', taskControllers.deleteTask);

module.exports = router;
