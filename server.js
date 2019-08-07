require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const mongoose = require("mongoose");
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const app = express();
const path = require("path");
const cors = require("cors");
// const socket = require('socket.io');
const PORT = process.env.PORT || 3300;
const routes = require('./routes');
const db = require("./models").db;

var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(socket){
  console.log("Socket user Connected"+ socket.id);
  // socket.on('reconnect_attempt', () => {
  //   socket.io.opts.transports = ['polling', 'websocket'];
  // });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('SEND_MESSAGE', function(msg){
    io.emit('RECEIVE_MESSAGE', msg);
  });
});


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
 app.use(express.static(path.join(__dirname, "/client/build")));
}



//Another way of defining Express configuration to understand the "body" would be:
 // Importing "body-parser" nmp package first...


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })) //  Using it as shown.
// app.use(express.static(path.join(__dirname, "/client/public"))); //? New
//app.use(express.json());
//app.use(cors());  // This ensures access from client requests to backend endpoints.
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})
// app.get('/send', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })


// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
// app.get('*', (req,res) => res.sendFile(path.join(__dirname+'/client/public/index.html'))).listen(3300,() => console.log('Server on port 3000'));


// Routes
app.use('/', routes);
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// var syncOptions = {
//   force: false
// };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }


// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//Connection to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/teamorganizer", {useNewUrlParser: true});

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync().then(function() {
  http.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

//module.exports = app; // This export is for "Mocha".