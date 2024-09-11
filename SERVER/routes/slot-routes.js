const express = require('express');
const router = express.Router();
const controllers = require('../controllers/slot-controllers');

router.get('/', controllers.getSlots);
router.get('/:id', controllers.getSlotsByDoctorId);
router.post('/', controllers.postSlots);
router.post('/bookslot/:userId', controllers.bookSlotsByUserID);
router.patch('/', controllers.patchSlotsById);
router.delete('/', controllers.deleteSlots);
router.delete('/:id', controllers.deleteSlotsByID);

module.exports = router;
