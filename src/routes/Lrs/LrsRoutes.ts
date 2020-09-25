import { registryNewEntityController } from "./../../UseCases/RegistryNewEntity";
import { Router } from "express";
import { ValidateToken } from "../../middlewares/AutenticateRequests";

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

export { LrsRoutes };
