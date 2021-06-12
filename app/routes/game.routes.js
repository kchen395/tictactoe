const controller = require("../controllers/game.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

	app.post("/api/game/record", controller.record);

  app.get("/api/game/history", controller.getHistory);
};
