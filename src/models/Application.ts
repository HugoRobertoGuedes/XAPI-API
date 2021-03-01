import { Auth } from "./Auth";
import { ObjectID } from "mongodb";

export class Application {
  public readonly _id?: ObjectID;
  public Title: string;
  public Description: string;
  public Entity_Id: ObjectID;
  public Dt_Create: Date;
  public Dt_Att: Date;
  public Status: boolean;
  public Auth_User: Auth;
  public Token_App: string;
  public Token_Expire: number;

  constructor(props: Omit<Application, "_id">, _id?: string) {
    Object.assign(this, props);
  }
}
