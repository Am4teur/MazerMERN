const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if(!token) {
    return res.status(401)
      .json({ msg : "Access denied. No jwt sent." });
  }

  const verified = jwt.verify(token ,process.env.JWT_SECRET_USER);

  if(!verified) {
    return res.status(401)
      .json({ msg : "Access denied. Invalid jwt." });
  }

  req.id = verified.id;

  next();
}


module.exports = auth;