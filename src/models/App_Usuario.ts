import { ObjectID } from "mongodb";
import { Auth } from "./Auth";

export class App_Usuario {
  public readonly _id?: ObjectID;
  public Nome: string;
  public Email: string;
  public Documento: string;
  public Aplicacoes_Cadastradas: string[];
  public Auth_Usuario: Auth;
  public Dt_Create: Date;
  public Dt_Att: Date;
  public Status: boolean;
  public Usuario_Criacao_Id: ObjectID;

  constructor(props: Omit<App_Usuario, "_id">, _id?: string) {
    Object.assign(this, props);
  }
}
