import { ObjectID } from "mongodb";
import { Aplicacao } from "../models/Aplicacao";

export interface IStatementRepository {
  InserirNovoStatement(db: string, statement: Object): Promise<Object>;
  BuscarStatementPorFiltro(db: string, filter: Object): Promise<Object>;
  BuscarAppPorTokenApp(token: string): Promise<Aplicacao>;
  ObterNomeDatabasePorEntidadeId(id: ObjectID): Promise<string>;
}