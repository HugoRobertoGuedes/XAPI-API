"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const AutenticationRoutes_1 = require("./routes/Autentication/AutenticationRoutes");
const StatementRoutes_1 = require("./routes/Statment/StatementRoutes");
require("dotenv").config();
// App
const app = express_1.default();
exports.app = app;
//
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
app.use(cors_1.default());
/**
 * Routes
 */
// Autenticação
app.use(AutenticationRoutes_1.AuthRoute);
// Statement
app.use(StatementRoutes_1.StatementRoute);
