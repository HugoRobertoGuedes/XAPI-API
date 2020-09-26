import { Auth } from "./Auth";
import { ObjectID } from "mongodb";

export class Aplicacao {
  public readonly _id?: ObjectID;
  public Titulo: string;
  public Descricao: string;
  public Entidade_Id: ObjectID;
  public Dt_Create: Date;
  public Dt_Att: Date;
  public Status: boolean;
  public Auth_Usuario: Auth;
  public Token_App: string;
  public Token_Expire: number;

  constructor(props: Omit<Aplicacao, "_id">, _id?: string) {
    Object.assign(this, props);
  }
}
