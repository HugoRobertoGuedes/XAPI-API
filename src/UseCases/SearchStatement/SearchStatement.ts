import { IStatementRepository } from "../../repositories/IStatementRepository";
import { RedisService } from "../../services/RedisService";

export class SearchStatement {
  constructor(
    private _iStatementRepository: IStatementRepository,
    private _redisService: RedisService
  ) {}

  async execulte(filter: Object, token: string): Promise<Object[]> {
    // Valid Auth
    let _KeyRedis = await this._redisService.GetValueToken(token);
    // Get database
    let _namedb: string = _KeyRedis["dbName"];
    // await return database
    let statements = await this._iStatementRepository.SearchStatement(
      _namedb,
      filter
    );

    return statements;
  }
}
