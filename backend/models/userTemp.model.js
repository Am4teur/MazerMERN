const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userTempSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 5,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    /*minlength: 3*/
  },
  x: {
    type: Number
  },
  y: {
    type: Number
  },
  createdAt: {
    type: Date,
    expires: 60
  }
});

const UserTemp = mongoose.model('UserTemp', userTempSchema);

module.exports = UserTemp;

// expire docs 3600 seconds after createdAt
//new Schema({ createdAt: { type: Date, expires: 3600 }});