const router = require('express').Router();

const { taskControllers } = require('../controllers');

router.get('/', taskControllers.getAllTasks);

router.post('/', taskControllers.postTask);

router.get('/:taskId', taskControllers.getTaskById);

router.patch('/:taskId', taskControllers.patchTask);

router.delete('/:taskId', taskControllers.deleteTask);

module.exports = router;
