const router = require("express").Router();

const mailController = require("../../controllers/mailController");
//For/api/mail
router
  .route("/")
 // .get(mailController.findByTaskId)
  .post(mailController.saveMail);

// fot /api/mail/:taskId
router
  .route("/:taskId")
  .get(mailController.findByTaskId)


module.exports = router;
     