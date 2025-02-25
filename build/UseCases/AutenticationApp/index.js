"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticacaoController = exports.autenticationApp = void 0;
const RedisService_1 = require("./../../services/RedisService");
const AuthRepository_1 = require("../../repositories/MongoDB/AuthRepository");
const AutenticationApp_1 = require("./AutenticationApp");
const AutenticationAppController_1 = require("./AutenticationAppController");
const StatementRepository_1 = require("./../../repositories/MongoDB/StatementRepository");
const app_1 = require("../../app");
const redisService = new RedisService_1.RedisService(app_1.redisCli);
const mongoAuthRepository = new AuthRepository_1.AuthRepository();
const statementRepository = new StatementRepository_1.StatementRepository();
const autenticationApp = new AutenticationApp_1.AutenticationApp(mongoAuthRepository, redisService, statementRepository);
exports.autenticationApp = autenticationApp;
const autenticacaoController = new AutenticationAppController_1.AutenticationAppController(autenticationApp);
exports.autenticacaoController = autenticacaoController;
