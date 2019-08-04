require("dotenv").config();
const express = require("express");
// const exphbs = require("express-handlebars");
const session = require("express-session");
const passport = require("./config/passport");
const mongoose = require("mongoose");
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const app = express();
const path = require("path");
const cors = require("cors");
const socket = require('socket.io');
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



server = app.listen(5000, function(){
  console.log('server is running on port 5000')
});



io = socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', function(data){
      io.emit('RECEIVE_MESSAGE', data);
  })
});


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/teamorganizer", {useNewUrlParser: true});


/*
Another way of defining Express configuration to understand the "body" would be:
var bodyParser = require('body-parser') // Importing "body-parser" nmp package first...
app.use(bodyParser.urlencoded({ extended: false })) //  Using it as shown.
*/
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, "/client/public"))); //? New
app.use(express.json());
app.use(cors());  // This ensures access from client requests to backend endpoints.
app.get('/send', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
app.use(cookieParser());

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
app.use('/', routes);
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

//Connection to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/teamorganizer", {useNewUrlParser: true});

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