require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const passport = require("./config/passport");
const app = express();
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 3300;
const db = require("./models").db;

// Middleware
/* 
! ===================== React Change
*/
app.use(  // Essential to for the Routes listeners to understand "body". It is part of definingin all Express configurations.
  express.urlencoded({
    extended: false
  })
);

/*
Another way of defining Express configuration to understand the "body" would be:
var bodyParser = require('body-parser') // Importing "body-parser" nmp package first...
app.use(bodyParser.urlencoded({ extended: false })) //  Using it as shown.
*/

app.use(express.static(path.join(__dirname, "/client/public"))); //? New
app.use(express.json());
app.use(cors());  // This ensures access from client requests to backend endpoints.

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
// app.get('*', (req,res) => res.sendFile(path.join(__dirname+'/client/public/index.html'))).listen(3300,() => console.log('Server on port 3000'));

/*
! ===================== React Change
// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/partials")
  })
  );
  app.set("view engine", "handlebars");
*/

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app; // This export is for "Mocha".
