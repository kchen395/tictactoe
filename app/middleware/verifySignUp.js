const db = require("../models");
const User = db.user;

const checkDuplicateUsername = (req, res, next) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Username already used."
      });
      return;
    }
    next();
  });
};

const verifySignUp = {
  checkDuplicateUsername: checkDuplicateUsername
};

module.exports = verifySignUp;
