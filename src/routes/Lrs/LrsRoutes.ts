import { registryNewEntityController } from "./../../UseCases/RegistryNewEntity";
import { Router } from "express";
import { ValidateToken } from "../../middlewares/AutenticateRequests";
import { searchEntityController } from "../../UseCases/SearchEntity";
import { registryNewAppController } from "../../UseCases/RegistryNewApp";
import { searchAppController } from "../../UseCases/SearchApp";
import { registryUserAppController } from "../../UseCases/RegistryUserApp";

const LrsRoutes = Router();

/**
 * Routes this autenticate for user this API
 */

/**
 * Autentication for aplication acess enpoints to API
 */
LrsRoutes.post("/entity", ValidateToken, (req, res, next) => {
  return registryNewEntityController.handler(req, res);
});

/**
 * Search entities by filter
 */
LrsRoutes.get("/entity", ValidateToken, (req, res, next) => {
  return searchEntityController.handler(req, res);
});

/**
 * Registry new App
 */
LrsRoutes.post("/app", ValidateToken, (req, res, next) => {
  return registryNewAppController.handler(req, res);
});

/**
 * Search Apps
 */
LrsRoutes.get("/app", ValidateToken, (req, res, next) => {
  return searchAppController.handler(req, res);
});

/**
 * New user App
 */
LrsRoutes.post("/app/user", ValidateToken, (req, res, next) => {
  return registryUserAppController.handler(req, res);
});

export { LrsRoutes };
