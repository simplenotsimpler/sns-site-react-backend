const express = require("express");
const router = express.Router();

const workController = require("../controllers/workController.js");

router.route("/").get(workController.getWork);

module.exports = router;