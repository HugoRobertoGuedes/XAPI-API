import { URI } from "./../../helpers/MongoConnection";
import { MongoClient } from "mongodb";
import { Entity } from "../../models/Entity";
import { IEntityRepository } from "../IEntityRepository";

export class EntityRepository implements IEntityRepository{
  constructor() {}

  async FindEntityFilter(filter: object): Promise<Entity[]> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    let entity: Entity[] = [];
    try {
      const db = client.db("Xapi_Admin");
      let collection = db.collection("Entities");

      // Query
      var query = filter;
      // Request  
      const cursor = await collection.find(query);
      // Return
      await cursor.forEach((el) => {
        entity.push(el);
      });
      return entity;
    } catch (error) {
      throw new Error(error);
    } finally {
      await client.close();
    }
  }

  async SaveNewEntity(entity: Entity): Promise<Object> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      const database = client.db("Xapi_Admin");
      var collection = database.collection("Entities");
      const result = await collection.insertOne(entity);
      return result.ops;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }
}
