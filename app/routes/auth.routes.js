const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsername,
    ],
    controller.signup
  );

	app.post("/api/auth/signin", controller.signin);

	app.put("/api/leaderboard/record", controller.record)

	app.get("/api/leaderboard/retrieve", controller.retrieve)
};