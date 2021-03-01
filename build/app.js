"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisCli = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
// Constantes
const Redis = require("ioredis");
// CONFIG
const { REDIS_HOST, REDIS_PORT } = require('./config');
// Redis Connection
// const redisCli = new Redis({host: REDIS_HOST, port: REDIS_PORT, name: 'XapiAPI'});
const redisCli = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    name: "xapiapi",
});
exports.redisCli = redisCli;
// import Routes
const AutenticationRoutes_1 = require("./routes/Autentication/AutenticationRoutes");
const StatementRoutes_1 = require("./routes/Statment/StatementRoutes");
const LrsRoutes_1 = require("./routes/Lrs/LrsRoutes");
require("dotenv").config();
// Imports
const requestIp = require("request-ip");
// App
const app = express_1.default();
exports.app = app;
//
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
app.use(cors_1.default());
app.set("trust proxy", true);
app.use(requestIp.mw());
/**
 * Routes
 */
// Autenticação
app.use(AutenticationRoutes_1.AuthRoute);
// Statement
app.use(StatementRoutes_1.StatementRoute);
// LRS
app.use(LrsRoutes_1.LrsRoutes);
