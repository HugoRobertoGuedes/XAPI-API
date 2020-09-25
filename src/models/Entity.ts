import { ObjectID } from "mongodb";
export class Entity {
  public readonly _id?: ObjectID;
  public Nome: string;
  public Email: string;
  public Telefone: string;
  public Documento: string;
  public Dt_Create: Date;
  public Dt_Att: Date;
  public Status: boolean;
  public Db_Name: string;

  constructor(props: Omit<Entity, "_id">, _id?: string) {
    Object.assign(this, props);
  }
}
