const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path")

let app = express()

var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))

const db = require("./app/models");

db.sequelize.sync();

require('./app/routes/auth.routes')(app);
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(3000, () => console.log("Listening on port 3000."));