const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const errorHandler = require("./middleware/error");

const PORT = process.env.PORT || 5000;

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 Mins
  max: 100,
});
app.use(limiter);
app.set("trust proxy", 1);

// Enable cors
app.use(cors());

// Routes
// app.get("/api", (req, res) => {
//   res.send("API is running....");
// });

app.use("/api", require("./routes/index.js"));


// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
