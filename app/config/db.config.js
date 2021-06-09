module.exports = {
  HOST: "localhost",
  USER: "admin",
  PASSWORD: "password",
  DB: "tictactoe",
	dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
	},
};