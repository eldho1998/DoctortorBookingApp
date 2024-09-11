const Presciption = require('../db/models/prescription-Schema');

// 1) GET all prescription (rejux)
module.exports.getprescription = async (req, res) => {
  const response = await Presciption.find();
  res.status(200).json({ message: 'Get all prescription', response });
};

// 2) GET by prescription id
module.exports.getPrescriptionById = (req, res) => {
  res.status(200).json({ message: 'Getting prescription By id' });
};

// 3) POST prescription

module.exports.postPrescription = async (req, res) => {
  // const prescription = await Prescription.create({
  //   name: req.body.name,
  //   image: `http//:localhost:${process.env.PORT}/uploads/${req.file.filename}`,
  // });
  res.status(200).json({ message: 'You can now post prescription' });
};

// 4) PATCH prescription by id

module.exports.patchPrescriptionById = async (req, res) => {
  const prescription = await Presciption.findByIdAndUpdate();
  res.status(200).json({ message: 'lets patch prescription', prescription });
};

// 5) DELETE all prescription

module.exports.deleteprescription = async (req, res) => {
  const prescription = await Presciption.deleteMany();
  res.status(200).json({ messsage: 'delete all prescription', prescription });
};

// 6) DELETE Prescription by id

module.exports.deletePrescriptionByID = async (req, res) => {
  const prescription = await Presciption.findByIdAndDelete();
  res.status(200).json({ message: 'delete prescription by id', prescription });
};
