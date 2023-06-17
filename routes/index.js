const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController.js");

router.route("/", (req, res) => {
  res.send('API is running....');
});

router.route("/projects").get(projectsController.getProjects);
module.exports = router;
