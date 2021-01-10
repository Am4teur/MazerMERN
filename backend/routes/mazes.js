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

router.route("/create").post((req, res) => {
  const {name, user_creater, seed, rows, cols} = req.body;
  console.log(req.body);

  let users = new Map();
  users.set(user_creater, {x: 0, y: 0, option: "0"})

  //const users = req.body.userId; //{req.body.userId :{"x": 0, "y":0, "option": "0"}};
  //const name = req.body.name;
  //const user_creater = req.body.userId;
  //const seed = parseInt(req.body.seed, 10);
  //const rows = parseInt(req.body.rows, 10);
  //const cols = parseInt(req.body.cols, 10);

  //validations

  const newMaze = new Maze({users, name, user_creater, seed, rows, cols});

  //add maze to the user

  newMaze.save()
    .then(() => res.json(newMaze))
    .catch(err => res.status(400).json("Error on '/mazes/create': " + err));

  console.log("newMaze");
  console.log(newMaze);
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