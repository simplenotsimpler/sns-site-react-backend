//splash page for backend
//https://github.com/gitdagray/mern_stack_course/blob/main/lesson_04/routes/root.js

const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

module.exports = router;
