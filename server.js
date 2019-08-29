require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const mongoose = require("mongoose");
//Great tool for http requests listenings.
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3300;
const routes = require("./routes");
const db = require("./models").db;
const server = require("http").Server(app);
const io = require("socket.io")(server);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
}

//Ternary for HTTP requests server log switching.
const loggerSwitch = false;
loggerSwitch ? app.use(logger("dev")) : "";

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", routes);
require("./routes/apiLogin.js")(app);
require("./routes/apiProject.js")(app);
require("./routes/apiCategory.js")(app);
require("./routes/apiTask.js")(app);

io.on("connection", function(socket) {
  //Production console.
  console.log("Socket user Connected: " + socket.id);
  socket.on("disconnect", () => {
    //Production console.
    console.log("user disconnected");
  });
  socket.on("SEND_MESSAGE", msg => {
    //Test console.
    // console.log(
    // "+++++++++++++++++++++++++++++\nI, the server, am getting this msg from the Client:\n",
    // msg,
    // "\n+++++++++++++++++++++++++++++");

    io.emit("RECEIVE_MESSAGE", msg);
  });
  socket.on("SAVE_NEWTASK", msg => {
    //Test console.
    console.log(
      "+++++++++++++++++++++++++++++\nI, the server, am getting this msg from the Client:\n",
      msg,
      "\n+++++++++++++++++++++++++++++"
    );

    io.emit("RENDER_NEWTASKS", msg);
  });
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Connection to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/teamorganizer",
  { useNewUrlParser: true }
);

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function() {
  server.listen(PORT, function() {
    //Production console.
    console.log(
      "==> Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
