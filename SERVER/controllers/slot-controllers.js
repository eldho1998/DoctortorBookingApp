const Slot = require('../db/models/slot-Schema');
const Appointment = require('../db/models/appointment-Schema');
const mongoose = require('mongoose');

// 1. Get Slots available
module.exports.getSlots = async (req, res) => {
  const slot = await Slot.find().populate('doctorID');
  res.status(200).json({ message: 'Total No.of Slots Gets', slot });
};

// 2) GET by Slots by doctor id
module.exports.getSlotsByDoctorId = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Slot.find({ doctorID: id }).populate('doctorID');
    res.status(200).json({ message: 'Getting Slots By Doctor Id', response });
  } catch (e) {
    res.status(500).json({ message: 'Error fetching Slots of Doctor' });
  }
};

// 3) POST Slots

module.exports.postSlots = async (req, res) => {
  try {
    const newSlot = await Slot.create({
      date: req.body.date,
      from: req.body.from,
      to: req.body.to,
      availableSlots: req.body.availableSlots,
      doctorID: req.body.doctorID,
    });

    res.status(201).json({
      message: 'Slot created successfully',
      slot: newSlot,
    });
  } catch (error) {
    console.error('Error posting slot:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// 4) PATCH Slots by id

module.exports.patchSlotsById = async (req, res) => {
  const slot = await Slot.findByIdAndUpdate();
  res.status(200).json({ message: 'lets patch Slots', Slot });
};

// 5) DELETE all Slots

module.exports.deleteSlots = async (req, res) => {
  const slot = await Slot.deleteMany();
  res.status(200).json({ messsage: 'delete all slots', Slot });
};

// 6) DELETE Slot by id

module.exports.deleteSlotsByID = async (req, res) => {
  const slot = await Slot.findByIdAndDelete();
  res.status(200).json({ message: 'delete slots by id', Slot });
};

//book Slots by user id

module.exports.bookSlotsByUserID = async (req, res) => {
  try {
    // user id
    const { userId } = req.params;

    // slot id
    const { slotId } = req.body;
    const slot = await Slot.findById(slotId); // {}

    if (!slot) {
      return res.status(404).json({ message: 'Slots not found' });
    }

    if (slot.availableSlots <= 0) {
      return res.status(400).json({ message: 'No available slots' });
    }

    const updatedSlot = await Slot.findByIdAndUpdate(
      slot._id,
      {
        availableSlots: slot.availableSlots - 1,
      },
      { new: true }
    );

    const appointmentCreate = await Appointment.create({
      doctor: slot.doctorID,
      slot: slot._id,
      user: userId,
    });

    res
      .status(200)
      .json({ message: 'Post slots by id', updatedSlot, appointmentCreate });
  } catch (e) {
    console.log('Error of booking slots:', e);
    res.status(500).json({ message: 'Error booking slots' });
  }
};
