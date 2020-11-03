import { Lrs_Usuario } from "./../../models/Lrs_Usuario";
import { URI } from "./../../helpers/MongoConnection";
import { MongoClient } from "mongodb";
import { ILrsRepository } from "../ILrsRepository";
import { ObjectId } from "mongodb";

export class LrsRepository implements ILrsRepository {
  constructor() {}

  async UpdateUserLrs(id:string,update: Object): Promise<Lrs_Usuario> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      const database = client.db("Xapi_Admin");
      var collection = database.collection("Lrs_Usuarios");
      const result = await collection.findOneAndUpdate({_id:new ObjectId(id)},update,{returnOriginal:false});
      let obj: Lrs_Usuario = result.value;
      return obj;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async SaveNewUserLrs(userlrs: Lrs_Usuario): Promise<Lrs_Usuario> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      const database = client.db("Xapi_Admin");
      var collection = database.collection("Lrs_Usuarios");
      const result = await collection.insertOne(userlrs);
      let obj: Lrs_Usuario = result.ops[0];
      return obj;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async SearchUserLrs(filter: Object): Promise<Lrs_Usuario[]> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    let users: Lrs_Usuario[] = [];
    try {
      const database = client.db("Xapi_Admin");
      var collection = database.collection("Lrs_Usuarios");
      let query = filter;
      const result = await collection.find(query);
      await result.forEach((el) => {
        users.push(el);
      });
      return users;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }
}
