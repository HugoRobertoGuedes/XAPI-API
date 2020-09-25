import { registryNewStatementController } from "./../../UseCases/RegistryNewStatement/";
import { Router } from "express";
import { ValidateToken } from "../../middlewares/AutenticateRequests";
import { searchStatementController } from "../../UseCases/SearchStatement";

const StatementRoute = Router();

/**
 * Routes this autenticate for user this API
 */

/**
 * Autentication for aplication acess enpoints to API
 */
StatementRoute.post("/statement", ValidateToken, (req, res, next) => {
  return registryNewStatementController.handler(req, res);
});

/**
 * Search Statements for object filter
 */
StatementRoute.get("/statement", ValidateToken, (req, res, next) => {
  return searchStatementController.handler(req, res);
});

export { StatementRoute };
