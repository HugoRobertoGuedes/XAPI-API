import { ObjectID } from "mongodb";
export class Lrs_User {
  public readonly _id?: ObjectID;
  public FullName: string;
  public User: string;
  public Pass: string;
  public Mail: string;
  public Phone: string;
  public Dt_Create: Date;
  public Dt_Att: Date;
  public Status: boolean;
  public Type: string;
  public Id_Entity: ObjectID;

  constructor(props: Omit<Lrs_User, "_id">, _id?: string) {
    Object.assign(this, props);
  }
}
