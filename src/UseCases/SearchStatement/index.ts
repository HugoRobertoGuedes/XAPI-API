import { RedisService } from "./../../services/RedisService";
import { StatementRepository } from "./../../repositories/MongoDB/StatementRepository";
import { SearchStatementController } from "./SearchStatementController";
import { SearchStatement } from "./SearchStatement";

import { redisCli } from "../../app";

const redisService = new RedisService(redisCli);
const statementRepository = new StatementRepository();

const searchStatement = new SearchStatement(
  statementRepository,
  redisService
);
const searchStatementController = new SearchStatementController(
  searchStatement
);

export { searchStatement, searchStatementController };
