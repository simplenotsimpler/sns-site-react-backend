require("dotenv").config();

const express = require("express");
const app = express();

const rateLimit = require("express-rate-limit");
const cors = require("cors");
const corsOptions = require("./config/corsOptions.js");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler.js");
const PORT = process.env.PORT || 5000;

app.use(logger);

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 Mins
  max: 100,
});

if (process.env.NODE_ENV === "production") {
  app.use(limiter);
}
app.set("trust proxy", 1);

// Enable cors
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", require("./routes/siteRootRoute.js"));

app.use("/api", require("./routes/index.js"));

//404 handling
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Error handler middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
