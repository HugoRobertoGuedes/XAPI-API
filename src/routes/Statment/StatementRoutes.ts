import { registryNewStatementController } from './../../UseCases/RegistryNewStatement/';
import { Router } from "express";
import { ValidateToken } from '../../middlewares/AutenticateRequests';

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


export { StatementRoute };
