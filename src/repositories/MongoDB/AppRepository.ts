import { Applications_Users } from "../../models/Applications_Users";
import { Application } from "../../models/Application";
import { MongoClient, ObjectId } from "mongodb";
import { URI } from "./../../helpers/MongoConnection";
import { IAppRepository } from "../IAppRepository";

export class AppRepository implements IAppRepository {
  constructor() {}

  async AppUpdate(_id: string, fields_updt: Object[]): Promise<Application> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    let updated: Application;
    try {
      const db = client.db("Xapi_Admin");
      let collection = db.collection("Applications");

      let cursor = await collection.findOneAndUpdate(
        { _id: new ObjectId(_id) },
        fields_updt,
        { returnOriginal: false }
      );
      updated = cursor["value"];
      return updated;
    } catch (error) {
      throw new Error(error);
    } finally {
      await client.close();
    }
  }

  async SearchApps(filter: Object): Promise<Application[]> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      let apps: Application[] = [];
      const database = client.db("Xapi_Admin");
      let collection = database.collection("Applications");
      const cursor = await collection.find(filter);
      await cursor.forEach((element) => {
        apps.push(element);
      });
      return apps;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async SearchUserApps(filter: Object): Promise<Applications_Users[]> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      let apps: Applications_Users[] = [];
      const database = client.db("Xapi_Admin");
      let collection = database.collection("Applications_Users");
      const cursor = await collection.find(filter);
      await cursor.forEach((element) => {
        apps.push(element);
      });
      return apps;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async RegistryNewUserApp(
    app: Applications_Users
  ): Promise<Applications_Users> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      const database = client.db("Xapi_Admin");
      var collection = database.collection("Applications_Users");
      const result = await collection.insertOne(app);
      let newUserApp: Applications_Users = result.ops[0];
      return newUserApp;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async RegistryNewApp(app: Application): Promise<Application> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      const database = client.db("Xapi_Admin");
      var collection = database.collection("Applications");
      const result = await collection.insertOne(app);
      let newApp: Application = result.ops[0];
      return newApp;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }
}
