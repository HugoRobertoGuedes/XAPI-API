const dotenv = require("dotenv");
dotenv.config();
export = {
  // Host
  HOST: process.env.HOST,
  PORT: process.env.PORT,

  // Ambient
  Ambient: process.env.NODE_ENV,

  // Database
  MONGO_DB_HOST: process.env.MONGO_HOST,
  MONGO_DB_PORT: process.env.MONGO_PORT,
  MONGO_DB_AUTH: process.env.MONGO_AUTH,
  MONGO_DB_USER: process.env.MONGO_USER,
  MONGO_DB_PASS: process.env.MONGO_PASS,

  // REDIS
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,

  // Keys
  SECRECT_APP_KEY: process.env.SECRET_KEY,

  // Roles Routes
  ROUTE_RULES: {
    APP: ["/statement"],
    LRS: ["/entity", "/app", "/app/user"],
  },
};
