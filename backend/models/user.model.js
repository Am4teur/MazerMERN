const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  mazes: {
    type: [Schema.Types.ObjectId]
  },
  icon: {
    type: String
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;