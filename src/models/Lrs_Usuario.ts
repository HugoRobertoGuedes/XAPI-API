import { ObjectID } from "mongodb";
export class Lrs_Usuario {
  public readonly _id?: ObjectID;
  public NomeCompleto: string;
  public NomeUsuario: string;
  public SenhaUsuario: string;
  public Email: string;
  public Telefone: string;
  public Dt_Create: Date;
  public Dt_Att: Date;
  public Status: boolean;
  public Tipo: string;
  public Id_Entidade: ObjectID;

  constructor(props: Omit<Lrs_Usuario, "_id">, _id?: string) {
    Object.assign(this, props);
  }
}
