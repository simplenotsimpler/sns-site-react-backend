const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("API is running....");
});

router.use("/basics", require("./basicsRoutes.js"));
router.use("/projects", require("./projectsRoutes.js"));
router.use("/skills", require("./skillsRoutes.js"));

// hide this from public since work gets all fields, many of which are confidential
// router.use("/work", require("./workRoutes.js"));

// hide these for privacy reasons
// router.use("/positions", require("./positionsRoutes.js"));
// router.use("/education", require("./educationRoutes.js"));

module.exports = router;
