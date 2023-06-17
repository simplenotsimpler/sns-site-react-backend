const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController.js");
const skillsController = require("../controllers/skillsController.js");

router.route("/", (req, res) => {
  res.send("API is running....");
});

router.route("/projects").get(projectsController.getProjects);

router.route("/skills").get(skillsController.getSkills);

module.exports = router;
