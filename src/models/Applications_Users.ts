import { ObjectID } from "mongodb";
import { Auth } from "./Auth";

export class Applications_Users {
  public readonly _id?: ObjectID;
  public Name: string;
  public Mail: string;
  public Document: string;
  public Registered_Applications: string[];
  public Auth_User: Auth;
  public Dt_Create: Date;
  public Dt_Att: Date;
  public Status: boolean;
  public User_Create_Id: ObjectID;

  constructor(props: Omit<Applications_Users, "_id">, _id?: string) {
    Object.assign(this, props);
  }
}
