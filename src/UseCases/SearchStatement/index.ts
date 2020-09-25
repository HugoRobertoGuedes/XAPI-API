import { RedisService } from "./../../services/RedisService";
import { StatementRepository } from "./../../repositories/MongoDB/StatementRepository";
import { SearchStatementController } from "./SearchStatementController";
import { SearchStatement } from "./SearchStatement";

const redisServicenew = new RedisService();
const statementRepository = new StatementRepository();

const searchStatement = new SearchStatement(
  statementRepository,
  redisServicenew
);
const searchStatementController = new SearchStatementController(
  searchStatement
);

export { searchStatement, searchStatementController };
