var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
//const creds = require('../config/config');
const apiRoutes = require("./api");

router.use("/api", apiRoutes);




var transport = {
  host: 'smtp-mail.outlook.com',
  secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
  auth: {
    // user: creds.USER,
    // pass: creds.PASS
    user: process.env.mailUser, //use your maill user
    pass: process.env.mailPassword //use your mail password
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
   console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res, next) => {
  var senderName = req.body.senderName
  var senderEmail = req.body.senderEmail
  var mailSubject = req.body.mailSubject
  var email = req.body.email
  var message = req.body.message
  // var content = `From: ${senderName} \n email: ${email} \n message: ${message} `

  var mail = {
    from: senderName,
    replyTo: senderEmail,
    to: email,  //Change to email address that you want to receive messages on
    subject: mailSubject,
    text: "From: " + senderName + " <"+ senderEmail+ ">\n\n" +  message
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

module.exports = router;
