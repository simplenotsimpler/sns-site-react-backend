//update per https://github.com/gitdagray/mern_stack_course/blob/main/lesson_13-backend/middleware/loginLimiter.js

const rateLimit = require("express-rate-limit");
const { logEvents } = require("./logger");

// Rate limit
const LIMIT_TIMEFRAME_MINUTES = 10;
const MINUTE_IN_MILLISECONDS = 60 * 1000;
const MAX_ATTEMPTS = 100;

const loginLimiter = rateLimit({
  windowMs: LIMIT_TIMEFRAME_MINUTES * MINUTE_IN_MILLISECONDS,
  max: MAX_ATTEMPTS,
  message: {
    message: "Too many requests from this IP address. Please try later.",
  },
  handler: (req, res, next, options) => {
    logEvents(
      `Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
      "errLog.log"
    );
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = loginLimiter;
