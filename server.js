const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const User = require("./User");
const Exercise = require("./Exercise");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/api/exercise/new-user", (req, res) => {
  const { username } = req.body;
  const user = new User({
    username: username,
  });
  user.save().then((result) => {
    res.send({ username: result.username, _id: result._id });
  });
});

app.get("/api/exercise/users", (req, res) => {
  User.find({})
    .select({ _v: 0 })
    .then((response) => {
      res.send(response);
    });
});

app.post("/api/exercise/add", (req, res) => {
  const body = req.body;
  User.findById(body.userId).then((user) => {
    const exercise = new Exercise({
      userId: body.userId,
      description: body.description,
      duration: body.duration,
      date: body.date,
    });
    //user.
    exercise.save().then((response) => {
      res.send({
        _id: user._id,
        username: user.username,
        date: response.date.toDateString(),
        description: response.description,
        duration: response.duration,
      });
    });
  });
});

app.get("/api/exercise/log", (req, res) => {
  const { userId } = req.query;
  const { from } = req.query;
  const { to } = req.query;
  const { limit } = req.query;
  User.findById(userId).then((user) => {
    Exercise.find({ userId: userId }).then((exercise) => {
      let log = [];
      log.push(...exercise);
      if (from) {
      }
      res.send({
        _id: user._id,
        username: user.username,
        count: log.length,
        log: log,
      });
    });
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
