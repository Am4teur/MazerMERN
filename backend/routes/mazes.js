const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let Maze = require("../models/maze.model");
const auth = require("../middleware/auth");



router.route("/").get((req, res) => {
  Maze.find()
    .then(mazes => res.json(mazes))
    .catch(err => res.status(400).json("Error on '/mazes/(empty)': " + err));
});

router.route("/add").post((req, res) => {
  console.log(req.body.name);
  const users = req.body.users;
  const name = req.body.name;
  const user_creater = req.body.user_creater;
  const seed = req.body.seed;
  const rows = req.body.rows;
  const cols = req.body.cols;

  const newMaze = new Maze({users, name, user_creater, seed, rows, cols});

  newMaze.save()
    .then(() => res.json("Maze added!"))
    .catch(err => res.status(400).json("Error on '/mazes/add': " + err));
});

router.route("/getById").post(async (req, res) => {
  const maze = await Maze.findById(req.body.mazeId);

  return res.json(maze);

  /* Another way without async and await
  Maze.findById(req.body.id)
  .then(maze => res.json(maze))
  .catch(err => res.status(400).json("Error on '/mazes/(empty)': " + err));*/
});

router.route("/update").post((req, res) => {
  Maze.findById(req.body.mazeId)
    .then(maze => {

      maze.users.set(req.body.userId, {x: req.body.y, y: req.body.x, option: req.body.option});

      maze.save()
        .then(() => res.json("Maze Updated!"))
        .catch(err => res.status(400).json("Error saving on '/mazes/update'" + err));
    })
    .catch(err => res.status(400).json("Error on '/mazes/update': " + err));
});

router.route("/delete").delete(auth, async (req, res) => {
  const deleteMaze = await Maze.findByIdAndDelete(req.id);
  res.json(deleteMaze);
});


module.exports = router;