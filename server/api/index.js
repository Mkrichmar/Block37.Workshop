const router = require("express").Router();

router.use("/item", require("./item"));
router.use("/auth", require("../auth"));
router.use("/review", require("./review"));


module.exports = router;