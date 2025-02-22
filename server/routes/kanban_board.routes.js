const Router = require('express');
const kanbanBoardController = require('../controller/kanban_board.controller');

const router = new Router();

router.get('/boards', kanbanBoardController.getAllBoards);
router.get('/boards/:id', kanbanBoardController.getBoardById);
router.post('/boards', kanbanBoardController.createBoard);
router.put('/boards/:id', kanbanBoardController.updateBoard);
router.delete('/boards/:id', kanbanBoardController.deleteBoard);

module.exports = router;
