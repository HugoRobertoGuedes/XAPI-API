import { ObjectID } from "mongodb";
import { Application } from "../models/Application";

export interface IStatementRepository {
  InsertNewStatement(db: string, statement: Object): Promise<Object>;
  SearchStatement(db: string, filter: Object): Promise<Object[]>;
  SearchAppByTokenApp(token: string): Promise<Application>;
  GetDatabaseNameByEntityId(id: ObjectID): Promise<string>;
}