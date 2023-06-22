const allowedOrigins = require("./allowedOrigins");

//based on Dave Gray code
//https://github.com/gitdagray/mern_stack_course/tree/main/lesson_02
//TODO: tweak the origins when deploy if needed
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
