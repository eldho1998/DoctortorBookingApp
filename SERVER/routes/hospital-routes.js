const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploads');
const controller = require('../controllers/hospital-controllers');

router.get('/', controller.getHospitals);
router.get('/:id', controller.getHospitalsById);
router.get('/:id/departments', controller.getDepartmentsByHospitalId);
router.get('/:id/doctors', controller.getDoctorsByHospitalId);
router.post('/', upload.single('image'), controller.postHospitals);
router.patch('/:id', upload.single('image'), controller.patchHospitalsById);
router.delete(
  '/:hospitalId/doctor/:doctorId',
  controller.deleteDoctorFromHospital
);
router.delete('/:id', controller.deleteHospitalsByID);

module.exports = router;
