import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { AuthRoute } from "./routes/Autentication/AutenticationRoutes";
import { StatementRoute } from "./routes/Statment/StatementRoutes";

require("dotenv").config();

// App
const app = express();

//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());

/**
 * Routes
 */

// Autenticação
app.use(AuthRoute);
// Statement
app.use(StatementRoute)
// Entidades
// Aplicações

export { app };
