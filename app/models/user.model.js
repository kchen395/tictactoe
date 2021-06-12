module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
		},
		wins: {
			type: Sequelize.INTEGER
		}
  });

  return User;
};