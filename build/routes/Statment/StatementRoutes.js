"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementRoute = void 0;
const RegistryNewStatement_1 = require("./../../UseCases/RegistryNewStatement/");
const express_1 = require("express");
const AutenticateRequests_1 = require("../../middlewares/AutenticateRequests");
const StatementRoute = express_1.Router();
exports.StatementRoute = StatementRoute;
/**
 * Routes this autenticate for user this API
 */
/**
 * Autentication for aplication acess enpoints to API
 */
StatementRoute.post("/statement", AutenticateRequests_1.ValidateToken, (req, res, next) => {
    return RegistryNewStatement_1.registryNewStatementController.handler(req, res);
});
