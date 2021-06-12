const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const db = require("./app/models");

let app = express();

const server = require("http").createServer(app);
const io = require("socket.io")(server);

var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

db.sequelize.sync();

require("./app/routes/auth.routes")(app);
require("./app/routes/game.routes")(app);
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

server.listen(3000, () => console.log("Listening on port 3000."));

const games = {};
let gameSize = 0;
io.on("connection", socket => {
  socket.on("joinGame", client => {
    const username = client.username;
    socket.join(username);
    if (!gameSize) {
      gameSize++;
      games["game1"] = {
        moves: Array(9).fill(null),
				currTurn: "X",
				winningMark: ""
      };
      games["game1"]["players"] = [username];
      io.sockets.in(username).emit("status", { status: "wait" });
    } else if (gameSize) {
      const currGame = games["game" + gameSize];
      if (currGame.players.length === 1) {
        currGame.players.push(username);
        io.sockets.in(username).emit("status", {
          status: "connected",
          opponent: currGame.players[0],
          gameKey: "game" + gameSize,
          game: currGame,
          mark: "O"
        });
        io.sockets.in(currGame.players[0]).emit("status", {
          status: "connected",
          opponent: username,
          gameKey: "game" + gameSize,
          game: currGame,
          mark: "X"
        });
      } else {
        gameSize++;
        games["game" + gameSize] = {
          moveCount: 0,
          moves: Array(9).fill(null),
					currTurn: "X",
					winningMark: ""
        };
        games["game" + gameSize]["players"] = [username];
        io.sockets.in(username).emit("status", { status: "wait" });
      }
    }
  });

  socket.on("makeMove", client => {
		games[client.gameKey] = client.game;
    const currGame = games[client.gameKey];
    if (currGame.currTurn === "O") {
			const user = currGame.players[1];
      io.sockets.in(user).emit("receiveMove", { game: currGame });
    } else {
			const user = currGame.players[0]
			io.sockets.in(user).emit("receiveMove", { game: currGame });
		}
  });
});
