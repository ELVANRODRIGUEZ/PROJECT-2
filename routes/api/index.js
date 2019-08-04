const router = require("express").Router();
const chatRoutes = require("./chatRoutes");

router.use("/chat", chatRoutes);

const mailRoutes = require("./mailRoutes");

router.use("/mail", mailRoutes);
router.use("http://localhost:3002/mail/send", mailRoutes);
module.exports = router;