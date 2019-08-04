const router = require("express").Router();
<<<<<<< HEAD
const chatRoutes = require("./chatRoutes");

router.use("/chat", chatRoutes);

=======
const mailRoutes = require("./mailRoutes");

router.use("/mail", mailRoutes);
router.use("http://localhost:3002/mail/send", mailRoutes)
>>>>>>> 1bb955dbcf87d0cf110d7758a8b199e00df26648
module.exports = router;