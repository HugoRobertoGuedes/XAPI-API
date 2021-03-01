import { registryNewEntityController } from "./../../UseCases/RegistryNewEntity";
import { Router } from "express";
import { ValidateToken } from "../../middlewares/AutenticateRequests";
import { searchEntityController } from "../../UseCases/SearchEntity";
import { registryNewAppController } from "../../UseCases/RegistryNewApp";
import { searchAppController } from "../../UseCases/SearchApp";
import { registryUserAppController } from "../../UseCases/RegistryUserApp";
import { searchUserAppController } from "../../UseCases/SearchUserApp";
import { searchAllUserAppController } from "../../UseCases/SearchAllUserApps";
import { registryNewUserLrsController } from "../../UseCases/RegistryNewUserLrs";
import { searchUserLrsController } from "../../UseCases/SearchUserLrs";
import { updateEntityController } from "../../UseCases/UpdateEntity";
import { updateUserLrsController } from "../../UseCases/UpdateUserLrs";
import { updateAppController } from "../../UseCases/UpdateApp";
import { registryNewReportController } from "../../UseCases/RegistryNewReport";
import { searchReportController } from "../../UseCases/SearchReport";
import { generateExcelController } from "../../UseCases/GenerateExcel";

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
 * Update Entity
 */
LrsRoutes.post("/entity/update", (req, res, next) => {
  ValidateToken(req,res,next,'/entity/update')
},(req,res)=> {
  return updateEntityController.handler(req, res);
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
 * update app
 */
LrsRoutes.post("/app/update", (req, res, next) => {
  ValidateToken(req,res,next,'/app')
},(req,res)=> {
  return updateAppController.handler(req, res);
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

/**
 * New user Lrs
 */
LrsRoutes.post("/lrs/user/new", (req, res, next) => {
  ValidateToken(req,res,next,'/lrs/user/new')
},(req,res)=> {
  return registryNewUserLrsController.handler(req, res);
});
/**
 * Search all users from entity
 */
LrsRoutes.get("/lrs/users/:id", (req, res, next) => {
  ValidateToken(req,res,next,'/lrs/users/:id')
},(req,res)=> {
  return searchUserLrsController.handler(req, res);
});
/**
 * Update user Lrs
 */
LrsRoutes.post("/lrs/users/:id", (req, res, next) => {
  ValidateToken(req,res,next,'/lrs/users/:id')
},(req,res)=> {
  return updateUserLrsController.handler(req, res);
});

/**
 * Registry new report
 */
LrsRoutes.post('/lrs/report', (req,res, next) => {
  ValidateToken(req,res, next, '/lrs/report')
}, (req,res)=>{
  return registryNewReportController.handler(req,res);
})

/**
 * Search Reports by filter
 */
LrsRoutes.get('/lrs/report', (req,res, next) => {
  ValidateToken(req,res, next, '/lrs/report')
}, (req,res)=>{
  return searchReportController.handler(req,res);
})

/**
 * Generate Excel
 */
LrsRoutes.post('/lrs/report/export', (req,res, next) => {
  ValidateToken(req,res, next, '/lrs/report/export')
}, (req,res)=>{
  return generateExcelController.handler(req,res);
})


export { LrsRoutes };
