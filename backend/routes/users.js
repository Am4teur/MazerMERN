const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = require("../models/user.model");
let UserTemp = require("../models/userTemp.model");
const auth = require("../middleware/auth");



router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error on '/users/(empty)': " + err));
});

/* NOT USED */
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const x = req.body.x;
  const y = req.body.y;

  const newUser = new User({username, x, y});

  newUser.save()
    .then(() => res.json("User added!"))
    .catch(err => res.status(400).json("Error on '/users/add': " + err));
});


router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.x = req.body.x;
      user.y = req.body.y;

      user.save()
        .then(() => res.json("User Updated!"))
        .catch(err => res.status(400).json("Error saving on '/users/update/:id'" + err));
    })
    .catch(err => res.status(400).json("Error on '/users/update/:id': " + err));
});


router.route("/register").post(async (req, res) => {
  const { email, password, passwordCheck, username, mazes, icon} = req.body;

  if(!validateEmail(email)) {
    return res.status(400)
      .json({ msg : "That email is invalid." });
  }
  const emailUser = await User.findOne({ email: email });
  if(emailUser) {
    return res.status(400)
    .json({ msg : "That email already exists." });
  }
  if(password.length < 5) {
    return res.status(400)
      .json({ msg : "Your password needs at least 5 characters." });
  }
  if(password != passwordCheck) {
    return res.status(400)
      .json({ msg : "Those passwords don't match." });
  }
  if(username.length < 3) {
    return res.status(400)
      .json({ msg : "Your username needs at least 3 characters." });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ email, hashedPassword, username, mazes, icon });

  newUser.save()
    .then(() => res.json(newUser))
    .catch(err => res.status(400).json("Error on '/users/register': " + err));
});


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if(!user) {
    return res.status(400)
      .json({ msg : "Invalid email. There is no account with that email." });
  }

  const isMatch = await bcrypt.compare(password, user.hashedPassword)
  if(!isMatch) {
    return res.status(400)
      .json({ msg : "Invalid password." });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_USER);
  res.json({
    token,
    user: {
      id: user._id,
      //email: user.email,
      username: user.username,
      icon: user.icon
    }
  });
});


router.route("/delete").delete(auth, async (req, res) => {
  const deleteUser = await User.findByIdAndDelete(req.id);
  res.json(deleteUser);
});


router.route("/tokenIsValid").post(async (req, res) => {
  const token = req.header("x-auth-token");
  if(!token) return res.json(false);

  const verified = jwt.verify(token, process.env.JWT_SECRET_USER);
  if(!verified) return res.json(false);

  const user = await User.findById(verified.id);
  if(!user) return res.json(false);

  return res.json(true);
});


router.route("/get").post(auth, async (req, res) => {
  const user = await User.findById(req.id);

  return res.json({
    id: user.id,
    username: user.username,
    x: user.x,
    y: user.y,
    mazes: user.mazes,
    icon: user.icon
  });
});



router.route("/addMaze").post(async (req, res) => {
  User.findById(req.body.userId)
    .then(user => {
      user.mazes.push(req.body.mazeId);

      user.save()
        .then(() => res.json("Added maze to user!"))
        .catch(err => res.status(400).json("Error saving on '/users/addMaze'" + err));
    })
    .catch(err => res.status(400).json("Error on '/users/addMaze': " + err));
});


module.exports = router;