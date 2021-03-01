import { RedisService } from "./../../services/RedisService";
import { StatementRepository } from "./../../repositories/MongoDB/StatementRepository";
import { RegistryNewStatementController } from "./RegistryNewStatementController";
import { RegistryNewStatement } from "./RegistryNewStatement";

import { redisCli } from "../../app";

const redisService = new RedisService(redisCli);
const statementRepository = new StatementRepository();

const registryNewStatement = new RegistryNewStatement(
  statementRepository,
  redisService
);
const registryNewStatementController = new RegistryNewStatementController(
  registryNewStatement
);

export { registryNewStatement, registryNewStatementController };
