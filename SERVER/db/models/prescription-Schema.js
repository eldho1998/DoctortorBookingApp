const mongoose = require('mongoose');

const prescriptionSchema = mongoose.Schema({
  note: {
    type: String,
    required: true,
    trim: true,
  },
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  doctorId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
  date: {
    type: Date,
    required: true,
  },
});

const Prescription = mongoose.model('Presciption', prescriptionSchema);

module.exports = Prescription;
