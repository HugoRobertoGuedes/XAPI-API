import { RedisService } from "./../../services/RedisService";
import { StatementRepository } from "./../../repositories/MongoDB/StatementRepository";
import { RegistryNewStatementController } from "./RegistryNewStatementController";
import { RegistryNewStatement } from "./RegistryNewStatement";

const statementRepository = new StatementRepository();
const redisService = new RedisService();

const registryNewStatement = new RegistryNewStatement(
  statementRepository,
  redisService
);
const registryNewStatementController = new RegistryNewStatementController(
  registryNewStatement
);

export { registryNewStatement, registryNewStatementController };
