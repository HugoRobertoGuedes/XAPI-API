import { App_Usuario } from "./../../models/App_Usuario";
import { Aplicacao } from "../../models/Aplicacao";
import { MongoClient } from "mongodb";
import { URI } from "./../../helpers/MongoConnection";
import { IAppRepository } from "../IAppRepository";

export class AppRepository implements IAppRepository {
  constructor() {}

  async SearchApps(filter: Object): Promise<Aplicacao[]> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      let apps: Aplicacao[] = [];
      const database = client.db("Xapi_Admin");
      let collection = database.collection("Aplicacoes");
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

  async SearchUserApps(filter: Object): Promise<App_Usuario[]> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      let apps: App_Usuario[] = [];
      const database = client.db("Xapi_Admin");
      let collection = database.collection("App_Usuarios");
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

  async RegistryNewUserApp(app: App_Usuario): Promise<App_Usuario> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      const database = client.db("Xapi_Admin");
      var collection = database.collection("App_Usuarios");
      const result = await collection.insertOne(app);
      let newUserApp: App_Usuario = result.ops[0];
      return newUserApp;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async RegistryNewApp(app: Aplicacao): Promise<Aplicacao> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      const database = client.db("Xapi_Admin");
      var collection = database.collection("Aplicacoes");
      const result = await collection.insertOne(app);
      let newApp: Aplicacao = result.ops[0];
      return newApp;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }
}
