const express = require("express");
const router = express.Router();

const positionsController = require("../controllers/positionsController.js");

router.route("/").get(positionsController.getPositions);

module.exports = router;