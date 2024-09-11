const express = require('express');
const controllers = require('../controllers/prescription-controllers');
const router = express.Router();

router.get('/', controllers.getprescription);
router.get('/:id', controllers.getPrescriptionById);
router.post('/', controllers.postPrescription);
router.patch('/:id', controllers.patchPrescriptionById);
router.delete('/', controllers.deleteprescription);
router.delete('/:id', controllers.deletePrescriptionByID);

module.exports = router;
