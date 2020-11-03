import { Router } from "express";
import { autenticacaoController } from "../../UseCases/AutenticationApp";
import { autenticacaoUserAppController } from "../../UseCases/AutenticationUserApp";
import { autenticationLrsController } from "../../UseCases/AutenticationLrs";
import { ValidateIpRequestAuth } from "../../middlewares/AutenticateRequests";

const AuthRoute = Router();

/**
 * Routes this autenticate for user this API
 */

/**
 * Autentication for aplication acess enpoints to API
 */
AuthRoute.post("/auth/app", (req, res, next) => {
  ValidateIpRequestAuth(req, res, next, '/auth/app');
}, (req,res) => {
  return autenticacaoController.handle(req, res);
});

/**
 * Auth this user in aplication
 */
AuthRoute.post("/auth/app/user", (req, res, next) => {
  ValidateIpRequestAuth(req, res, next, '/auth/app/user');
}, (req,res) => {
  return autenticacaoUserAppController.handle(req, res);
});

/**
 * Auth for user acess learning recorded storage
 */
AuthRoute.post("/auth/lrs", (req, res, next) => {
  ValidateIpRequestAuth(req, res, next, '/auth/lrs');
}, (req,res) => {
  return autenticationLrsController.handle(req, res);
});



export { AuthRoute };
