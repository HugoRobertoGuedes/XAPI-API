import { registryNewEntityController } from "./../../UseCases/RegistryNewEntity";
import { Router } from "express";
import { ValidateToken } from "../../middlewares/AutenticateRequests";
import { searchEntityController } from "../../UseCases/SearchEntity";
import { registryNewAppController } from "../../UseCases/RegistryNewApp";
import { searchAppController } from "../../UseCases/SearchApp";
import { registryUserAppController } from "../../UseCases/RegistryUserApp";
import { searchUserAppController } from "../../UseCases/SearchUserApp";
import { searchAllUserAppController } from "../../UseCases/SearchAllUserApps";

const LrsRoutes = Router();

/**
 * Routes this autenticate for user this API
 */

/**
 * Autentication for aplication acess enpoints to API
 */
LrsRoutes.post("/entity", (req, res, next) => {
  ValidateToken(req,res,next,'/entity')
},(req,res)=> {
  return registryNewEntityController.handler(req, res);
});

/**
 * Search entities by filter
 */
LrsRoutes.get("/entity", (req, res, next) => {
  ValidateToken(req,res,next,'/entity')
},(req,res)=> {
  return searchEntityController.handler(req, res);
});

/**
 * Registry new App
 */
LrsRoutes.post("/app", (req, res, next) => {
  ValidateToken(req,res,next,'/app')
},(req,res)=> {
  return registryNewAppController.handler(req, res);
});

/**
 * Search Apps
 */
LrsRoutes.get("/app", (req, res, next) => {
  ValidateToken(req,res,next,'/app')
},(req,res)=> {
  return searchAppController.handler(req, res);
});

/**
 * New user App
 */
LrsRoutes.post("/app/user", (req, res, next) => {
  ValidateToken(req,res,next,'/app/user')
},(req,res)=> {
  return registryUserAppController.handler(req, res);
});

/**
 * Search user for app
 */
LrsRoutes.get("/app/:id/users", (req, res, next) => {
  ValidateToken(req,res,next,'/app/:id/users')
},(req,res)=> {
  return searchUserAppController.handler(req, res);
});

/**
 * search all user apps
 */
LrsRoutes.get("/app/users/all", (req, res, next) => {
  ValidateToken(req,res,next,'/app/users/all')
},(req,res)=> {
  return searchAllUserAppController.handler(req, res);
});

export { LrsRoutes };
