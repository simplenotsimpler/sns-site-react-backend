require("dotenv").config();

const express = require("express");

//compression
const compression = require("compression");

//standard security imports
const secure = require("ssl-express-www");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const corsOptions = require("./config/corsOptions.js");

const loginLimiter = require("./middleware/loginLimiter.js");

const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler.js");

//app initialization
const app = express();

//compress
app.use(compression({ level: 8 }));

const PORT = process.env.PORT || 5000;

app.use(logger);

// need this for environments like Heroku
/* 
  specifically need to set the second parameter to 1 for express-rate-limiter
  https://stackoverflow.com/questions/62494060/express-rate-limit-not-working-when-deployed-to-heroku
*/
app.set("trust proxy", 1);

if (process.env.NODE_ENV === "production") {
  app.use(secure);
}

// Enable cors
// app.use(cors(corsOptions));
app.use(cors());

// Set security headers
/* 
  NOTE: when enable helmet get content security policy messages in Firefox. Do not get these in Chrome.
    Content Security Policy: Couldn’t process unknown directive ‘script-src-attr’
    Content Security Policy: The page’s settings blocked the loading of a resource at inline (“script-src”).
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src-attr#browser_compatibility
*/
app.use(helmet());

if (process.env.NODE_ENV === "production") {
  app.use(loginLimiter);
}

//basics
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Prevent XSS attacks
app.use(xss());

// Prevent http param pollution
app.use(hpp());

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
