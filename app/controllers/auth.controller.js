const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
    wins: 0
  })
    .then(user => {
      res.send({ message: "Success!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password."
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400
      });

      res.status(200).send({
        id: user.id,
        username: user.username,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.record = (req, res) => {
  User.increment("wins", {
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      res.send({ message: "Success!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.retrieve = (req, res) => {
  User.findAll()
    .then(data => {
      res.status(200).send({
        data: data.map(user => {
          return { username: user.username, wins: user.wins };
        })
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
