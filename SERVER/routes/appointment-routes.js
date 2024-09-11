const express = require('express');
const router = express.Router();
const controllers = require('../controllers/appointment-controllers');

router.get('/', controllers.getAppointment);
router.get('/:id', controllers.getAppointmentById);
router.get('/user/:userId', controllers.getAppointmentByUserId);
router.get('/doctor/:doctorId', controllers.getAppointmentsByDoctorId);

router.put('/:id/accept', controllers.AcceptAppointment);
router.put('/:id/reject', controllers.RejectAppointment);

router.post('/', controllers.postAppointment);
router.patch('/', controllers.patchAppointmentById);
router.delete('/', controllers.deleteAppointment);
router.delete('/:id', controllers.deleteAppointmentByID);

module.exports = router;
