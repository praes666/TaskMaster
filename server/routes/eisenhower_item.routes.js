const Router = require('express');
const router = new Router();
const eisenhowerItemController = require('../controller/eisenhower_item.controller');

router.post('/eisenhower', eisenhowerItemController.createItem); // Создать задачу
router.get('/eisenhower', eisenhowerItemController.getAllItems); // Получить все задачи
router.get('/eisenhower/:id', eisenhowerItemController.getItemById); // Получить задачу по ID
router.put('/eisenhower/:id', eisenhowerItemController.updateItem); // Обновить задачу
router.delete('/eisenhower/:id', eisenhowerItemController.deleteItem); // Удалить задачу

module.exports = router;
