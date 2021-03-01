import { IAuthRepository } from "../IAuthRepository";
import { Application } from "../../models/Application";
import { Auth } from "./../../models/Auth";
import { URI } from "./../../helpers/MongoConnection";
import { Applications_Users } from "../../models/Applications_Users";
import { MongoClient } from "mongodb";
import { Lrs_User } from "../../models/Lrs_User";

export class AuthRepository implements IAuthRepository {
  constructor() {}

  /**
   * Find User Lrs
   * @param auth Auth Model
   */
  async FindUserlrsByAuth(auth: Auth): Promise<Lrs_User> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    let app: Lrs_User;
    try {
      const db = client.db("Xapi_Admin");
      let collection = db.collection("Lrs_Users");

      // Query
      var query = {
        "User": auth.user,
        "Pass": auth.pass,
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
  async FindAppByToken(token: string): Promise<Application> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    let app: Application;
    try {
      const db = client.db("Xapi_Admin");
      let collection = db.collection("Applications");

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
  async FindAppByAuth(auth: Auth): Promise<Application> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    let app: Application;
    try {
      const db = client.db("Xapi_Admin");
      let collection = db.collection("Applications");

      // Query
      var query = {
        "Auth_User.user": auth.user,
        "Auth_User.pass": auth.pass,
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
  async FindUserApp(auth: Auth): Promise<Applications_Users> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    let app: Applications_Users;
    try {
      const db = client.db("Xapi_Admin");
      let collection = db.collection("Applications_Users");

      // Query
      var query = {
        "Auth_User.user": auth.user,
        "Auth_User.pass": auth.pass,
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
