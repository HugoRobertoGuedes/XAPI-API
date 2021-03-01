const { MongoClient } = require("mongodb");

import { IStatementRepository } from "./../IStatementRepository";
import { ObjectID } from "mongodb";
import { Application } from "../../models/Application";
import { URI } from "../../helpers/MongoConnection";

export class StatementRepository implements IStatementRepository {
  constructor() {}

  async InsertNewStatement(db: string, statement: Object): Promise<Object> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      const database = client.db(db);
      var collection = database.collection("Statement");
      const result = await collection.insertOne(statement);
      return result.ops;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async SearchStatement(db: string, filter: Object): Promise<Object[]> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      const state: object[] = [];
      const database = client.db(db);
      var collection = database.collection("Statement");
      var query = filter;
      var result = await collection.find(query);
      await result.forEach((element) => {
        state.push(element);
      });
      return state;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async SearchAppByTokenApp(token: string): Promise<Application> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      let app: Application;
      const database = client.db("Xapi_Admin");
      let collection = database.collection("Applications");

      var query = {
        Token_App: token,
      };

      const cursor = await collection.find(query);
      await cursor.forEach((element) => {
        app = element;
      });
      return app;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async GetDatabaseNameByEntityId(id: ObjectID): Promise<string> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      let db: string;
      const database = client.db("Xapi_Admin");
      let collection = database.collection("Entities");

      let query = {
        _id: id,
      };
      let projection = {
        Db_Name: 1.0,
      };

      const cursor = await collection.find(query).project(projection);
      await cursor.forEach((element) => {
        db = element.Db_Name;
      });
      return db;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }
}
