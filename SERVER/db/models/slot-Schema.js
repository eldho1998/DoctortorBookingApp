const mongoose = require('mongoose');

const slotSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  availableSlots: {
    type: Number,
    required: true,
  },
  doctorID: [{ type: mongoose.Types.ObjectId, ref: 'Doctor' }],
  userId: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
