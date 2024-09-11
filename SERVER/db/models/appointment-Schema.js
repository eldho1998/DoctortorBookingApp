const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  user: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  doctor: [{ type: mongoose.Types.ObjectId, ref: 'Doctor' }],
  slot: [{ type: mongoose.Types.ObjectId, ref: 'Slot' }],
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
