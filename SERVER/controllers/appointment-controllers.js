const Appointment = require('../db/models/appointment-Schema');

// 1. Get Appointment available
module.exports.getAppointment = async (req, res) => {
  const appointment = await Appointment.find();
  console.log('appointment:', appointment);
  res
    .status(200)
    .json({ message: 'Total No.of Appointment Gets', appointment });
};

// 2) GET by Appointment id
module.exports.getAppointmentById = (req, res) => {
  res.status(200).json({ message: 'Getting Appointment By id' });
};

// 3) POST Appointment

module.exports.postAppointment = async (req, res) => {
  const { body } = req;
  const appointment = await Appointment.create(body);
  res
    .status(200)
    .json({ message: 'You can now post Appointment', Appointment });
};

//get appointment bookings by userId

module.exports.getAppointmentByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log('user id:', userId);

    const response = await Appointment.find({ user: userId })
      .populate('doctor')
      .populate('slot');
    console.log('appo:', response);
    res
      .status(200)
      .json({ message: 'Getting Appointments By user Id', response });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Error fetching Apppintments of user' });
  }
};

// get appointment bookings by doctorId

module.exports.getAppointmentsByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const response = await Appointment.find({ doctor: doctorId })
      .populate('doctor')
      .populate('slot')
      .populate('user');
    console.log('appo of doctors:', response);
    res
      .status(200)
      .json({ message: 'Getting Appointments of doctor by id', response });
  } catch (e) {
    res
      .status(500)
      .json({ message: 'Error getting appointments of doctor', e });
  }
};

// 4) PATCH Appointment by id

module.exports.patchAppointmentById = async (req, res) => {
  const appointment = await Appointment.findByIdAndUpdate();
  res.status(200).json({ message: 'lets patch Appointment', Appointment });
};

// 5) DELETE all Appointment

module.exports.deleteAppointment = async (req, res) => {
  const appointment = await Appointment.deleteMany();
  res.status(200).json({ messsage: 'delete all Appointment', Appointment });
};

// 6) DELETE Appointment by id (user,doctor)

module.exports.deleteAppointmentByID = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);
    res.status(200).json({ message: 'delete Appointment by id', appointment });
  } catch (e) {
    res.status(500).json({ message: 'error', e });
  }
};

// Accept and Reject Appointment By doctor ID

module.exports.AcceptAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'Accepted' },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment Accepted', appointment });
  } catch (e) {
    res.status(500).json({ message: 'Error Accepting appointment', e });
  }
};

//reject

module.exports.RejectAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const rejectappointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'Rejected' },
      { new: true }
    );

    if (!rejectappointment) {
      return res.status(404).json({ message: 'Not found Appointments' });
    }
    res
      .status(200)
      .json({ messsage: 'Appointment Rejected', rejectappointment });
  } catch (e) {
    res.status(500).json({ message: 'Error Rejecting appointment' });
  }
};
