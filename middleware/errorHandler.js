//errorHandler per https://github.com/gitdagray/mern_stack_course/blob/main/lesson_02/middleware/errorHandler.js
//combined w/ https://github.com/bradtraversy/node-api-proxy-server/blob/main/middleware/error.js

const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  // console.log(err.stack);

  const status = res.statusCode ? res.statusCode : 500; // server error

  res.status(status).json({
    success: false,
    error: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

module.exports = errorHandler;
