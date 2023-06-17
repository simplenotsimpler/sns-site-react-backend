const express = require("express");
const router = express.Router();

router.route("/", (req, res) => {
  res.send("API is running....");
});

router.use("/projects", require("./projectsRoutes.js"));
router.use("/skills", require("./skillsRoutes.js"));
router.use("/basics", require("./basicsRoutes.js"));

module.exports = router;
