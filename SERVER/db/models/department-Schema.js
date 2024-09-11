const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
      trim: true,
    },
    image: {
      type: String,
    },
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }],
  },
  {
    timestamps: true,
  }
);

const Department = mongoose.model('Department', DepartmentSchema);
module.exports = Department;
