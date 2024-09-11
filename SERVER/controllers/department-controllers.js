const Department = require('../db/models/department-Schema');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// 1) GET departments from api

module.exports.getDepartments = async (req, res) => {
  const departments = await Department.find();
  res.status(200).json({ message: 'Get All Departments', departments });
};

//get doctors by department id
module.exports.getDoctorsOfDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id).populate('doctors');

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(department.doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// 2) GET by department id
module.exports.getDepartmentsById = async (req, res) => {
  const { id } = req.params;
  const departments = await Department.findById(id);
  res.status(201).json({ message: 'Getting Department By id', departments });
};

// 3) POST departments

module.exports.postDepartments = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const department = await Department.create({
      name: req.body.name,
      image: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`,
      doctors: req.body.doctors,
    });

    res
      .status(200)
      .json({ message: 'You can now post departments', department });
  } catch (e) {
    res.status(500).json({
      message: 'An error occurred while creating the department',
      error: e.message || e,
    });
  }
};

// 4) PATCH departments by id
module.exports.patchDepartments = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const department = await Department.findByIdAndUpdate(
      id,
      { $push: { doctors: body.doctor } },
      {
        new: true,
      }
    );

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res
      .status(200)
      .json({ message: 'Department updated successfully', department });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 6) DELETE by department id

module.exports.deleteDepartmentsByID = (req, res) => {
  res.status(200).json({ message: 'delete dept by id' });
};

// 5) DELETE doctorfrom departments id
module.exports.deleteDoctorFromDepartment = async (req, res) => {
  try {
    const { departmentId, doctorId } = req.params;

    // Find the department by ID
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    // Remove the doctor from the department's doctors array
    department.doctors.pull(doctorId);

    // Save the updated department
    await department.save();

    res
      .status(200)
      .json({ message: 'Doctor removed from department successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
