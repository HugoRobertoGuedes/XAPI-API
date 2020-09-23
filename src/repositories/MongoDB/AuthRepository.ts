import { IAuthRepository } from "../IAuthRepository";
import { Aplicacao } from "./../../models/Aplicacao";
import { Auth } from "./../../models/Auth";
import { URI } from "./../../helpers/MongoConnection";
import { App_Usuario } from "../../models/App_Usuario";
import { ObjectID, MongoClient } from "mongodb";
import { Lrs_Usuario } from "../../models/Lrs_Usuario";

export class AuthRepository implements IAuthRepository {
  constructor() {}

  /**
   * Find User Lrs
   * @param auth Auth Model
   */
  async FindUserlrsByAuth(auth: Auth): Promise<Lrs_Usuario> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    let app: Lrs_Usuario;
    try {
      const db = client.db("Xapi_Admin");
      let collection = db.collection("Lrs_Usuarios");

      // Query
      var query = {
        "NomeUsuario": auth.user,
        "SenhaUsuario": auth.pass,
      };

      // Request
      const cursor = await collection.find(query);

      // Return
      await cursor.forEach((el) => {
        app = el;
      });
      return app;
    } catch (error) {
      throw new Error(error);
    } finally {
      await client.close();
    }
  }

  /**
   *
   * @param token Token App generate to register
   */
  async FindAppByToken(token: string): Promise<Aplicacao> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    let app: Aplicacao;
    try {
      const db = client.db("Xapi_Admin");
      let collection = db.collection("Aplicacoes");

      // Query
      var query = {
        Token_App: token,
      };

      // Request
      const cursor = await collection.find(query);

      // Return
      await cursor.forEach((el) => {
        app = el;
      });
      return app;
    } catch (error) {
      throw new Error(error);
    } finally {
      await client.close();
    }
  }

  /**
   * Return App by autentication user
   * @param auth Model Auth
   * @param tokenApp Token to App
   */
  async FindAppByAuth(auth: Auth): Promise<Aplicacao> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    let app: Aplicacao;
    try {
      const db = client.db("Xapi_Admin");
      let collection = db.collection("Aplicacoes");

      // Query
      var query = {
        "Auth_Usuario.user": auth.user,
        "Auth_Usuario.pass": auth.pass,
      };

      // Request
      const cursor = await collection.find(query);

      // Return
      await cursor.forEach((el) => {
        app = el;
      });
      return app;
    } catch (error) {
      throw new Error(error);
    } finally {
      await client.close();
    }
  }

  /**
   * Return App user
   * @param auth Auth Model
   */
  async FindUserApp(auth: Auth): Promise<App_Usuario> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    let app: App_Usuario;
    try {
      const db = client.db("Xapi_Admin");
      let collection = db.collection("App_Usuarios");

      // Query
      var query = {
        "Auth_Usuario.user": auth.user,
        "Auth_Usuario.pass": auth.pass,
      };

      // Request
      const cursor = await collection.find(query);

      // Return
      await cursor.forEach((el) => {
        app = el;
      });
      return app;
    } catch (error) {
      throw new Error(error);
    } finally {
      await client.close();
    }
  }
}
