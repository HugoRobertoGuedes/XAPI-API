import { StatementRepository } from "./../../repositories/MongoDB/StatementRepository";
import { RedisService } from "./../../services/RedisService";
import { AuthRepository } from "../../repositories/MongoDB/AuthRepository";
import { AutenticationUserApp } from "./AutenticationUserApp";
import { AutenticationUserAppController } from "./AutenticationUserAppController";

import { redisCli } from "../../app";

const redisService = new RedisService(redisCli);
const mongoAuthRepository = new AuthRepository();
const statementRepository = new StatementRepository();

const autenticationUserApp = new AutenticationUserApp(
  mongoAuthRepository,
  redisService,
  statementRepository
);

const autenticacaoUserAppController = new AutenticationUserAppController(
  autenticationUserApp
);

export { autenticationUserApp, autenticacaoUserAppController };
