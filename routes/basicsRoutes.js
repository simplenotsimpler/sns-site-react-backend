const express = require("express");
const router = express.Router();

const basicsController = require("../controllers/basicsController.js");

router.route("/").get(basicsController.getBasics);

module.exports = router;