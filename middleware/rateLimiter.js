const rateLimit = require('express-rate-limit');
const { renderError } = require('./error-handlers.js');

// Rate limit
const LIMIT_TIMEFRAME_MINUTES=10
const MINUTE_IN_MILLISECONDS=60 * 1000
const MAX_ATTEMPTS=100

//NOTE: can't use exports.rateLimiter - not recognized in app.use
const rateLimiter = rateLimit({
  windowMs: LIMIT_TIMEFRAME_MINUTES * MINUTE_IN_MILLISECONDS, 
  max: MAX_ATTEMPTS,
  handler: async (req, res, next) => {
    await renderError(req, res, 429, 'Too Many Requests', `Too many requests from this IP address.`,`Please try later `);
  }

});

module.exports = rateLimiter;