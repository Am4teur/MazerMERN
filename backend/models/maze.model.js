const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IconSchema = new Schema({
  x: Number,
  y: Number,
  option: String
});

const mazeSchema = new Schema({
  users: {
    type: Map,
    of: IconSchema
  },
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
