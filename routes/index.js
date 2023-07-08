const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("API is running....");
});

router.use("/basics", require("./basicsRoutes.js"));
router.use("/projects", require("./projectsRoutes.js"));
router.use("/skills", require("./skillsRoutes.js"));
router.use("/work", require("./workRoutes.js"));
router.use("/positions", require("./positionsRoutes.js"));
router.use("/education", require("./educationRoutes.js"));

module.exports = router;
