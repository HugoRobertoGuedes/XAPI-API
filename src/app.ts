import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

// CONSTS
const Redis = require("ioredis");

// CONFIG
const { REDIS_HOST, REDIS_PORT } = require('./config');

// REDIS
const redisCli = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    name: "xapiapi",
});

// ROUTES
import { AuthRoute } from "./routes/Autentication/AutenticationRoutes";
import { StatementRoute } from "./routes/Statment/StatementRoutes";
import { LrsRoutes } from "./routes/Lrs/LrsRoutes";

require("dotenv").config();

// IMPORTS
const requestIp = require("request-ip");

// APP Express
const app = express();

// Express Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.set("trust proxy", true);
app.use(requestIp.mw());

/**
 * Use Routes
 */

// Autenticação
app.use(AuthRoute);
// Statement
app.use(StatementRoute);
// LRS
app.use(LrsRoutes);

export { app, redisCli };
