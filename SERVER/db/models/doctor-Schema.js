const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    // required: true,
  },
  position: {
    type: String,
    // required: true,
    trim: true,
  },
  qualification: {
    type: String,
    // required: true,
    trim: true,
  },
  phone: {
    type: Number,
    trime: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    trim: true,
  },
  password: {
    type: String,
  },
  about: {
    type: String,
  },

  department: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
  hospital: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' }],
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
