const Router = require('express');
const personController = require('../controller/person.controller');

const router = new Router();

router.post('/registration', personController.createPerson);
router.get('/person', personController.getAllPersons);
router.get('/person/:id', personController.getPersonById);
router.put('/person/:id', personController.updatePerson);
router.delete('/person/:id', personController.deletePerson);

module.exports = router;
