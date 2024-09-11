const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/DoctorBookingApp')
  .then(() => {
    console.log('DB CONNECTED');
  })
  .catch(e => {
    console.log(e);
  });

module.exports = mongoose;
