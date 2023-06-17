const express = require("express");
const router = express.Router();

const educationController = require("../controllers/educationController.js");

router.route("/").get(educationController.getEducation);

module.exports = router;