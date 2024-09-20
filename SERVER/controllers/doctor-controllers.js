const Doctor = require('../db/models/doctor-Schema');
const genPassword = require('generate-password');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const verifyDoctorToken = require('../middlewares/verifyDoctorToken');

module.exports.getDoctorBy =
  (verifyDoctorToken,
  async (req, res) => {
    try {
      const doctorId = req.params.id;
      const doctor = await Doctor.findById(doctorId);

      if (!doctor) {
        return res.status(404).json({ message: 'Doctor not found' });
      }

      res.status(200).json(doctor);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

// 1) GET all Doctors (regex)

module.exports.getDoctors = async (req, res) => {
  const { searchDoctor } = req.query;

  try {
    let response;
    if (searchDoctor) {
      console.log('Search Doctor:', searchDoctor);
      response = await Doctor.find({
        name: { $regex: RegExp(searchDoctor, 'i') },
      });
    } else {
      response = await Doctor.find({});
    }

    console.log('Response from MongoDB:', response);
    res.status(200).json({ message: 'Get all Doctors', response });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Error fetching doctors', error });
  }
};

// 2) GET by Doctor id
module.exports.getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json(doctor);
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
};

// 3) PATCH Doctor by id

module.exports.patchDoctorById = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    if (req.file) {
      const imageLink = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;
      body.image = imageLink;
    }
    const doctor = await Doctor.findByIdAndUpdate(id, body, { new: true });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Doctor updated successfully', doctor });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// 4) DELETE all Doctors

module.exports.deleteDoctors = async (req, res) => {
  const doctor = await Doctor.deleteMany();
  res.status(200).json({ messsage: 'delete all doctors', doctor });
};

// 5) DELETE Doctor by id

module.exports.deleteDoctorByID = async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findByIdAndDelete(id);
  res.status(200).json({ message: 'delete doctor by id', doctor });
};

// 6. SIGN UP DOCTOR BY ADMIN post

module.exports.doctorSignup = async (req, res) => {
  try {
    console.log('workingggggg');
    const body = req.body;
    console.log(body);

    const doctor = await Doctor.findOne({ email: body.email });
    if (doctor) {
      return res
        .status(403)
        .json({ message: 'Email id already taken.Give me another', doctor });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }
    //password generate by pass-generator package

    const docPassword = genPassword.generate({
      length: 10,
      numbers: true,
    });
    //pasword hashed by bcrypt package
    const hashedPassword = await bcrypt.hash(docPassword, 10);
    const imageLink = `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`;
    console.log(imageLink);

    const response = await Doctor.create({
      ...body,
      image: imageLink,
      password: hashedPassword,
      department: new mongoose.Types.ObjectId(body.department),
      hospital: new mongoose.Types.ObjectId(body.hospital),
    });
    console.log('done -- - - - - - - - -working');

    // to send mail by nodemailer
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kudukurian123@gmail.com',
        pass: 'masw ggju aycg hgri',
      },
    });
    //setup email data:
    let mailOptions = {
      from: 'kudukurian123@gmail.com',
      to: body.email,
      subject: 'Hello Doctor ,Your Login Creds',
      text: `Your mail id is ${body.email} and your password is ${docPassword} Dont share
      it to any one and you can change your email id and password 
      while you login in to your profile. Best Regards - Admin Panel`,
    };

    //send mail

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error.message);
        return res
          .status(500)
          .json({ success: false, message: 'Error sending mail', error });
      } else {
        console.log('Email sent:', info, response);
        return res.status(200).json({
          success: true,
          messsage: 'Doctor registered successfully!',
          response,
        });
      }
    });
  } catch (e) {
    console.error('Signup error:', e.message);
    res.status(500).json({ message: 'Error during signup', error: e.message });
  }
};

//7. Login By Doctor with generated password and their email

module.exports.loginDoctor = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const doctor = await Doctor.findOne({ email: body.email });
    if (!doctor) {
      return res.status(404).json({ message: 'Email or password Incorrect' });
    }
    console.log('Doctor found:', doctor);
    console.log('Password from request:', body.password);
    console.log('Hashed password from DB:', doctor.password);

    const isMatching = await bcrypt.compare(body.password, doctor.password);
    if (!isMatching) {
      res.status(403).json({ message: 'Incorrect password or email' });
    }

    //token

    const token = jwt.sign(
      { id: doctor._id, role: 'doctor' },
      process.env.DOCTORKEY,
      {
        expiresIn: '365d',
      }
    );

    return res
      .status(200)
      .json({ message: 'You are Logged in', token, id: doctor._id });
  } catch (e) {
    console.error('Error during Login:', e);
    return res.status(500).json({ message: 'Server error' });
  }
};

// 8. forgot password by doctor

module.exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const doctor = await Doctor.findOne({ email: email });

    if (!doctor) {
      return res.status(403).json({ message: 'Email doesnot match' });
    }

    //token

    const resetToken = jwt.sign(
      { email: email },
      process.env.FORGOT_PASSWORD_KEY,
      {
        expiresIn: 301,
      }
    );

    // to send mail by nodemailer
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kudukurian123@gmail.com',
        pass: 'masw ggju aycg hgri',
      },
    });
    //setup email data:
    let mailOptions = {
      from: 'kudukurian123@gmail.com',
      to: email,
      subject: 'Hello Doctor ,You can Reset Your Password',
      text: `Please reset your password using the link http://localhost:${process.env.PORT}/doctor/reset/${resetToken}`,
    };

    //send mail

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'fail to send email' });
      } else {
        return res.status(200).json({ message: 'Mail Send' });
      }
    });
  } catch (e) {
    return res.status(500).json({ message: 'An error occurred', error });
  }
};

// 9. reset passwword

module.exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  console.log(token);
  const { password, confirmPassword } = req.body;
  try {
    const isValid = jwt.verify(token, process.env.FORGOT_PASSWORD_KEY);
    if (password != confirmPassword) {
      return res.status(403).json({ message: 'Password doesnt match' });
    }
    const email = isValid.email;
    const hashedPassword = await bcrypt.hash(password, 2);
    const doctor = await Doctor.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }
    );
    res.status(200).json({ messsage: 'password reset Successfully', doctor });
  } catch (e) {
    return res.status(403).json({ message: 'Invalid Token' });
  }
};

module.exports.getRestPage = async (req, res) => {
  const token = req.params.token;

  // Verify the token (this is just an example, customize as needed)
  jwt.verify(token, process.env.FORGOT_PASSWORD_KEY, err => {
    if (err) {
      return res.status(400).send('Invalid or expired token.');
    }

    // Render the reset password page
    res.render('resetPassword', { token });
  });
};

//pdf download

module.exports.pdf = async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id);
  console.log(doctor);
  res.render('pdf', { doctor }); // ,{doctor:doctor} if key and value is same
};
