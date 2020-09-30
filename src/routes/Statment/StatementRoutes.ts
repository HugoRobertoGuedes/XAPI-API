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
StatementRoute.post("/statement", (req, res, next) => {
  ValidateToken(req,res,next,'/statement')
}, (req,res)=>{
  return registryNewStatementController.handler(req, res);
});

/**
 * Search Statements for object filter
 */
StatementRoute.get("/statement", (req, res, next) => {
  ValidateToken(req,res,next,'/statement')
}, (req,res)=>{
  return searchStatementController.handler(req, res);
});

export { StatementRoute };
