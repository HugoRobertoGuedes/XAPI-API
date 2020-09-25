import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

// import Routes
import { AuthRoute } from "./routes/Autentication/AutenticationRoutes";
import { StatementRoute } from "./routes/Statment/StatementRoutes";
import { LrsRoutes } from "./routes/Lrs/LrsRoutes";

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
// LRS
app.use(LrsRoutes)

export { app };
