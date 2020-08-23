const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const x = req.body.x;
  const y = req.body.y;

  const newUser = new User({username, x, y});

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.x = req.body.x;
      user.y = req.body.y;

      user.save()
        .then(() => res.json("User Updated!"))
        .catch(err => res.status(400).json("Err" + err));
    })
    .catch(err => res.status(400).json("Err" + err));
});




module.exports = router;