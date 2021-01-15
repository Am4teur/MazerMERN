const router = require("express").Router();
let Maze = require("../models/maze.model");
const auth = require("../middleware/auth");



router.route("/").get((req, res) => {
  Maze.find()
    .then(mazes => res.json(mazes))
    .catch(err => res.status(400).json("Error on '/mazes/(empty)': " + err));
});

router.route("/create").post(async (req, res) => {
  const {name, user_creater, seed, rows, cols} = req.body;

  let users = {user_creater: {x: 0, y: 0, option: "0"}};

  //validations
  if(name.length < 1 || name.length > 20) {
    return res.status(400)
      .json({ msg : "That name is invalid. It needs to have length between 1 and 20." });
  }
  const mazeName = await Maze.findOne({ name: name });
  if(mazeName) {
    return res.status(400)
    .json({ msg : "That name already exists." });
  }

  const seedInt = parseInt(seed, 10);
  if(!isInteger(seed) || seedInt < 1 || seedInt > 1000000) {
    return res.status(400)
      .json({ msg : "The seed is a number between 1 and 1 000 000." });
  }

  const rowsInt = parseInt(rows, 10);
  if(!isInteger(rows) || rowsInt < 2 || rowsInt > 20) {
    return res.status(400)
      .json({ msg : "The rows are a number between 2 and 20." });
  }

  const colsInt = parseInt(cols, 10)
  if(!isInteger(cols) || colsInt < 2 || colsInt > 20) {
    return res.status(400)
      .json({ msg : "The columns are is a number between 2 and 20." });
  }

  const newMaze = new Maze({users, name, user_creater, seed, rows, cols});

  // could have added maze to user here?

  newMaze.save()
    .then(() => res.json(newMaze))
    .catch(err => res.status(400).json("Error on '/mazes/create': " + err));
});

router.route("/getById").post((req, res) => {
  Maze.findById(req.body.mazeId)
  .then(maze => res.json(maze))
  .catch(err => res.status(400).json("Error on '/mazes/(empty)': " + err));

  /* Another way with async and await
  const maze = await Maze.findById(req.body.mazeId);

  return res.json(maze);*/
});

router.route("/getManyById").post(async (req, res) => {
  const mazes = await Maze.find({
    '_id': { $in: req.body.ids}
  }, function(err, docs){
     console.log(docs);
  });

  return res.json(mazes);
});


router.route("/addUser").post((req, res) => {
  Maze.findById(req.body.mazeId)
    .then(maze => {

      maze.users.set(req.body.userId, {x: req.body.y, y: req.body.x, option: req.body.option});

      maze.save()
        .then(() => res.json("Added user to maze!"))
        .catch(err => res.status(400).json("Error saving on '/mazes/addUser'" + err));
    })
    .catch(err => res.status(400).json("Error on '/mazes/addUser': " + err));
});

router.route("/delete").delete(auth, async (req, res) => {
  const deleteMaze = await Maze.findByIdAndDelete(req.id);
  res.json(deleteMaze);
});

function isInteger(value) {
  return /^\d+$/.test(value);
}

module.exports = router;