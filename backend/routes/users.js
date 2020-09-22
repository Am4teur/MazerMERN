const router = require("express").Router();
const bcrypt = require("bcryptjs");
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error on '/users/(empty)': " + err));
});

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
  const { email, password, passwordCheck, username, x, y} = req.body;


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
      .json({ msg : "Use 5 characters or more for your password." });
  }
  if(password != passwordCheck) {
    return res.status(400)
      .json({ msg : "Those passwords don't match. Try again." });
  }
  if(username.length < 3) {
    return res.status(400)
      .json({ msg : "Use 3 characters or more for your username." });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ email, hashedPassword, username, x, y });

  newUser.save()
    .then(() => res.json("Registered a new User!"))
    .catch(err => res.status(400).json("Error on '/users/register': " + err));
});

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


module.exports = router;