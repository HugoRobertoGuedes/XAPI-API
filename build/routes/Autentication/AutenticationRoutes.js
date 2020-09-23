"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const AutenticationApp_1 = require("../../UseCases/AutenticationApp");
const AutenticationUserApp_1 = require("../../UseCases/AutenticationUserApp");
const AutenticationLrs_1 = require("../../UseCases/AutenticationLrs");
const AuthRoute = express_1.Router();
exports.AuthRoute = AuthRoute;
/**
 * Routes this autenticate for user this API
 */
/**
 * Autentication for aplication acess enpoints to API
 */
AuthRoute.post("/auth/app", (req, res, next) => {
    return AutenticationApp_1.autenticacaoController.handle(req, res);
});
/**
 * Auth this user in aplication
 */
AuthRoute.post("/auth/app/user", (req, res, next) => {
    return AutenticationUserApp_1.autenticacaoUserAppController.handle(req, res);
});
/**
 * Auth for user acess learning recorded storage
 */
AuthRoute.post("/auth/lrs", (req, res, next) => {
    return AutenticationLrs_1.autenticationLrsController.handle(req, res);
});
