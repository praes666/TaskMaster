const Router = require('express');
const kanbanStateController = require('../controller/kanban_state.controller');

const router = new Router();

router.get('/states', kanbanStateController.getAllStates);
router.get('/states/:id', kanbanStateController.getStateById);
router.post('/states', kanbanStateController.createState);
router.put('/states/:id', kanbanStateController.updateState);
router.delete('/states/:id', kanbanStateController.deleteState);

module.exports = router;
