const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mazeSchema = new Schema({
  users: [[Schema.Types.Mixed]], //userId, x, y, option
  name: String,
  user_creater: Schema.Types.ObjectId,
  seed: Number,
  rows: Number,
  cols: Number,
  }, {
  timestamps: true,
});

const Maze = mongoose.model('Maze', mazeSchema);

module.exports = Maze;