const Hospital = require('../db/models/hospital-Schema');

//1) GET all Hospitals
module.exports.getHospitals = async (req, res) => {
  try {
    const { searchHospital } = req.query;

    let query;

    if (searchHospital) {
      query = Hospital.find({
        name: {
          $regex: RegExp(searchHospital, 'i'),
        },
      });
    } else {
      query = Hospital.find();
    }

    // Populate the departments field
    const response = await query.populate('departments');

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: 'error', e });
  }
};

// get departments of specific hospital

module.exports.getDepartmentsByHospitalId = async (req, res) => {
  try {
    const { id } = req.params; // Get hospital ID from request parameters
    console.log(`Fetching departments for hospital ID: ${id}`);

    // Find the hospital by ID and populate the departments
    const hospital = await Hospital.findById(id).populate('departments');

    // Check if the hospital exists
    if (!hospital) {
      console.log('Hospital not found');
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // Return the departments of the found hospital
    console.log('Departments fetched:', hospital.departments);
    res.status(200).json(hospital.departments);
  } catch (err) {
    console.error('Error retrieving departments:', err.message);
    res
      .status(500)
      .json({ message: 'Error retrieving departments', error: err.message });
  }
};

// get doctor of specific Hospital
module.exports.getDoctorsByHospitalId = async (req, res) => {
  try {
    const { id } = req.params; // Get hospital ID from request parameters
    console.log(`Fetching doctors for hospital ID: ${id}`);

    // Find the hospital by ID and populate the doctors
    const hospital = await Hospital.findById(id).populate('doctors');

    // Check if the hospital exists
    if (!hospital) {
      console.log('Hospital not found');
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // Return the doctors of the found hospital
    console.log('Doctors fetched:', hospital.doctors);
    res.status(200).json(hospital.doctors);
  } catch (err) {
    console.error('Error retrieving doctors:', err.message);
    res
      .status(500)
      .json({ message: 'Error retrieving doctors', error: err.message });
  }
};

// 2) GET by Hospital id
module.exports.getHospitalsById = async (req, res) => {
  const { id } = req.params;
  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res
        .status(404)
        .json({ message: 'Hospital not found', response: null });
    }
    res
      .status(200)
      .json({ message: 'Getting hospital by id', response: hospital });
  } catch (e) {
    console.error('Error fetching hospital by ID:', e);
    res
      .status(500)
      .json({ message: 'Error getting hospital', error: e.message });
  }
};

// 3) POST Hospital

module.exports.postHospitals = async (req, res) => {
  try {
    const body = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }
    const imageLink = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;
    const address = {
      city: body.city,
      street: body.street,
      pincode: body.pincode,
    };

    const formattedData = {
      name: body.name,
      address: address,
      image: imageLink,
      departments: body.departments,
      doctors: body.doctors || [],
    };

    const hospital = await Hospital.create(formattedData);
    const populatedHospital = await Hospital.findById(hospital._id)
      .populate('departments')
      .populate('doctors');

    console.log('created hospital:', populatedHospital);

    return res.status(200).json({
      message: 'You can now post hospitals',
      hospital: populatedHospital,
    });
  } catch (e) {
    console.error('Error creating hospital:', e);
    return res.status(500).json({
      message: 'An error occurred while creating the hospital',
      error: e.message || e,
    });
  }
};

// 4) PATCH hospitals by id

module.exports.patchHospitalsById = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    console.log(id);
    console.log(body);

    const hospital = await Hospital.findByIdAndUpdate(
      id,
      { $push: { doctors: body.doctor } },
      { new: true }
    );
    if (!hospital) {
      res.status(404).json({ message: 'Hospital not found' });
    }

    res
      .status(200)
      .json({ message: 'Hospitals updated Successfully', hospital });
  } catch (e) {
    res.status(500).json({ message: 'Error updating Hospital', e });
  }
};

// 5) DELETE all hospitals

// 6) DELETE hospital by id

module.exports.deleteHospitalsByID = async (req, res) => {
  const { id } = req.params;
  const hospital = await Hospital.findByIdAndDelete(id);
  res.status(200).json({ message: 'delete hospital by id', hospital });
};

// 5) DELETE doctor from Hospital
module.exports.deleteDoctorFromHospital = async (req, res) => {
  try {
    const { hospitalId, doctorId } = req.params;

    // Find the hospital by ID
    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }

    // Remove the doctor from the hospital's doctors array
    hospital.doctors.pull(doctorId);

    // Save the updated hospital
    await hospital.save();

    res
      .status(200)
      .json({ message: 'Doctor removed from hospital successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
