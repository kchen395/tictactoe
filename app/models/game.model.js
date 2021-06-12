module.exports = (sequelize, Sequelize) => {
  const Game = sequelize.define("game", {
    player1: {
      type: Sequelize.STRING
    },
    player2: {
      type: Sequelize.STRING
    },
    winner: {
      type: Sequelize.STRING
    }
  });

  return Game;
};
