const express = require("express");
const router = express.Router();

const projectsController = require("../controllers/projectsController.js");

router.route("/").get(projectsController.getProjects);

module.exports = router;
