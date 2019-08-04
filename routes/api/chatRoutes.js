const router = require("express").Router();

const chatController = require("../../controllers/chatController");
//For/api/mail


router
  .route("/")
 // .get(mailController.findByTaskId)
  .post(chatController.saveChat);

// fot /api/mail/:taskId
router
  .route("/:taskId")
  .get(chatController.findByTaskId)


module.exports = router;