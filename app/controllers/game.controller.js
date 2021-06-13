const db = require("../models");
const Game = db.game;

exports.record = (req, res) => {
  Game.create({
    player1: req.body.player1,
    player2: req.body.player2,
    winner: req.body.winner
  })
    .then(data => {
      res.send({ message: "Success!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getHistory = (req, res) => {
  Game.findAll()
    .then(data => {
      res.status(200).send({
        data
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
