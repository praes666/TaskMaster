const Router = require('express');
const kanbanTaskController = require('../controller/kanban_task.controller');

const router = new Router();

router.get('/tasks', kanbanTaskController.getAllTasks);
router.get('/tasks/:id', kanbanTaskController.getTaskById);
router.post('/tasks', kanbanTaskController.createTask);
router.put('/tasks/:id', kanbanTaskController.updateTask);
router.delete('/tasks/:id', kanbanTaskController.deleteTask);

module.exports = router;
