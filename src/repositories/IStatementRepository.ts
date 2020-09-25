import { ObjectID } from "mongodb";
import { Aplicacao } from "../models/Aplicacao";

export interface IStatementRepository {
  InsertNewStatement(db: string, statement: Object): Promise<Object>;
  SearchStatement(db: string, filter: Object): Promise<Object[]>;
  SearchAppByTokenApp(token: string): Promise<Aplicacao>;
  GetDatabaseNameByEntityId(id: ObjectID): Promise<string>;
}