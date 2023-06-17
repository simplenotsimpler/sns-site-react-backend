const express = require("express");
const router = express.Router();

const skillsController = require("../controllers/skillsController.js");

router.route("/").get(skillsController.getSkills);

module.exports = router;
