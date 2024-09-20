const express = require('express');
const router = express.Router();
const controllers = require('../controllers/doctor-controllers');
const upload = require('../middlewares/uploads');
const checkToken = require('../middlewares/checkToken');

router.get('/', controllers.getDoctors);
router.get('/doctor/:id', controllers.getDoctorBy);
router.post('/signup', upload.single('image'), controllers.doctorSignup);
router.post('/login', controllers.loginDoctor);
router.put('/:id', upload.single('image'), controllers.patchDoctorById);
router.delete('/', controllers.deleteDoctors);
router.delete('/:id', controllers.deleteDoctorByID);
router.post('/forgot', controllers.forgotPassword);
router.post('/reset/:token', controllers.resetPassword);
router.get('/reset/:token', controllers.getRestPage);
router.get('/:id', checkToken(['doctor']), controllers.getDoctorById);
router.get('/pdf/:id', controllers.pdf);

module.exports = router;
