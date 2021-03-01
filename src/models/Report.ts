import { ObjectID } from "mongodb";
export class Report {
  public readonly _id?: ObjectID;
  public Type: string;
  public Title: string;
  public Description: string;
  public Id_Report: string;
  public Id_Workspace: string;
  public IsRole: boolean;
  public Roles: string;
  public Dt_Create: Date;
  public Dt_Att: Date;
  public User_Created: ObjectID;
  public AppToken: string;

  constructor(props: Omit<Report, "_id">, _id?: string) {
    Object.assign(this, props);
  }
}
