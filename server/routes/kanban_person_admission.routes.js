const Router = require('express');
const kanbanPersonAdmissionController = require('../controller/kanban_person_admission.controller');

const router = new Router();


router.get('/admissions', kanbanPersonAdmissionController.getAllAdmissions);
router.get('/admissions/:id', kanbanPersonAdmissionController.getAdmissionById);
router.post('/admissions', kanbanPersonAdmissionController.createAdmission);
router.put('/admissions/:id', kanbanPersonAdmissionController.updateAdmission);
router.delete('/admissions/:id', kanbanPersonAdmissionController.deleteAdmission);

module.exports = router;
