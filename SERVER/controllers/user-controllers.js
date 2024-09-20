const User = require('../db/models/user-Schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. Get Users
module.exports.getUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({ message: 'Get all Users', user });
  } catch (error) {
    console.error('Error finding users', error);
    res.status(500).json({ message: 'Error finding users' });
  }
};

// 2. Get users by id
module.exports.getUsersById = async (req, res) => {
  //   const { id } = req.params;
  const user = await User.find();
  res.status(200).json({ message: 'Get All users by id' });
};

// 4. Patch Users

module.exports.patchUsers = async (req, res) => {
  //   const { body } = req;
  const user = await User.findByIdAndUpdate();
  res.status(200).json({ message: 'Patch Users' });
};

// 5. delete all Users

module.exports.deleteAllUsers = async (req, res) => {
  const user = await User.deleteMany();
  res.status(200).json({ message: 'delete all users' });
};

// 6. Delete  Users by id

module.exports.deleteUserById = async (req, res) => {
  const user = await User.findByIdAndDelete();
  res.status(200).json({ message: 'delete user by id' });
};

// 7. sign up user

module.exports.userSignup = async (req, res) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res
        .status(403)
        .json({ message: 'Email already used..Try another one' });
    }

    if (body.password != body.confirmPassword) {
      return res.status(403).json({ message: 'Passwords not matching!' });
    }

    const hashedPassword = await bcrypt.hash(body.password, 2);
    const hashedConfirmPassword = await bcrypt.hash(body.confirmPassword, 2);
    body.password = hashedPassword;
    body.confirmPassword = hashedConfirmPassword;

    //store email and hashed password in to a new variable
    const newUser = await User.create(body);
    return res
      .status(201)
      .json({ message: 'Thank you for Signing in to the App', newUser });
  } catch (e) {
    return res.status(500).json({ message: 'Error signing in' });
  }
};

// 8. Login User

module.exports.loginUser = async (req, res) => {
  try {
    const body = req.body;

    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(403).json({ message: 'Please Sign in' });
    }
    const isMatching = await bcrypt.compare(body.password, user.password);
    if (!isMatching) {
      return res.status(403).json({ message: 'Email or Password Incorrect!' });
    }
    // if isMatching true
    //token generate
    // anyone can eaisly access by knowing this Api. But user have only this token can enter into the app

    const token = jwt.sign(
      {
        id: user._id,
        role: 'USER',
      },
      process.env.USERKEY,
      {
        expiresIn: '365d',
      }
    );

    return res
      .status(200)
      .json({ message: 'Login Success', token, id: user._id });
  } catch (e) {
    return res.status(500).json({ message: 'Error Logging in', e });
  }
};
