const express = require('express');
const controller = require('../controllers/department-controllers');
const upload = require('../middlewares/uploads');

const router = express.Router();

router.get('/', controller.getDepartments);
router.get('/:id', controller.getDepartmentsById);
router.get('/:id/doctors', controller.getDoctorsOfDepartment);
router.post('/', upload.single('image'), controller.postDepartments);
router.patch('/:id', controller.patchDepartments);
router.delete('/:id', controller.deleteDepartmentsByID);
router.delete(
  '/:departmentId/doctor/:doctorId',
  controller.deleteDoctorFromDepartment
);

module.exports = router;
