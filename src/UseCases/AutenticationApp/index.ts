import { RedisService } from "./../../services/RedisService";
import { AuthRepository } from "../../repositories/MongoDB/AuthRepository";
import { AutenticationApp } from "./AutenticationApp";
import { AutenticationAppController } from "./AutenticationAppController";
import { StatementRepository } from "./../../repositories/MongoDB/StatementRepository";
import { redisCli } from "../../app";

const redisService = new RedisService(redisCli);
const mongoAuthRepository = new AuthRepository();
const statementRepository = new StatementRepository();

const autenticationApp = new AutenticationApp(
  mongoAuthRepository,
  redisService,
  statementRepository
);

const autenticacaoController = new AutenticationAppController(autenticationApp);

export { autenticationApp, autenticacaoController };
