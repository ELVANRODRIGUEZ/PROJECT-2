const router = require("express").Router();
const chatRoutes = require("./chatRoutes");

router.use("/chat", chatRoutes);

module.exports = router;