import { Router } from "express";
import { autenticacaoController } from "../../UseCases/AutenticationApp";
import { autenticacaoUserAppController } from "../../UseCases/AutenticationUserApp";
import { autenticationLrsController } from "../../UseCases/AutenticationLrs";

const AuthRoute = Router();

/**
 * Routes this autenticate for user this API
 */

/**
 * Autentication for aplication acess enpoints to API
 */
AuthRoute.post("/auth/app", (req, res, next) => {
  return autenticacaoController.handle(req, res);
});

/**
 * Auth this user in aplication
 */
AuthRoute.post("/auth/app/user", (req, res, next) => {
  return autenticacaoUserAppController.handle(req, res);
});

/**
 * Auth for user acess learning recorded storage
 */
AuthRoute.post("/auth/lrs", (req, res, next) => {
  return autenticationLrsController.handle(req, res);
});


export { AuthRoute };
