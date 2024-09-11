const express = require('express');
const router = express.Router();
const departmentRoutes = require('./department-routes');
const hospitalRoutes = require('./hospital-routes');
const doctorRoutes = require('./doctor-routes');
const slotRoutes = require('./slot-routes');
const appointmentRoutes = require('./appointment-routes');
const prescriptionRoutes = require('./prescription-routes');
const userRoutes = require('./user-routes');

router.use('/department', departmentRoutes);
router.use('/hospital', hospitalRoutes);
router.use('/doctor', doctorRoutes);
router.use('/slots', slotRoutes);
router.use('/appointment', appointmentRoutes);
router.use('/prescription', prescriptionRoutes);
router.use('/user', userRoutes);

module.exports = router;
