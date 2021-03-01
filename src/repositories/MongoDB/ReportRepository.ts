import { URI } from "./../../helpers/MongoConnection";
import { MongoClient } from "mongodb";
import { IReportRepository } from "../IReportRepository";
import { Report } from "../../models/Report";

export class ReportRepository implements IReportRepository {
  constructor() {}

  async ExeculteQuery(filter: Object, name_database: string, name_collection: string): Promise<Object[]> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      let fields: Object[] = [];
      const database = client.db(name_database);
      let collection = database.collection(name_collection);
      const cursor = await collection.find(filter);
      await cursor.forEach((element) => {
        fields.push(element);
      });
      return fields;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

  async SaveNewReport(report: Report): Promise<Report> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      const database = client.db("Xapi_Admin");
      var collection = database.collection("Reports");
      const result = await collection.insertOne(report);
      let obj: Report = result.ops[0];
      return obj;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }
  
  async SearchReportByFilter(filter: Object): Promise<Report[]> {
    const client = new MongoClient(URI, { useUnifiedTopology: true });
    await client.connect();
    try {
      let reports: Report[] = [];
      const database = client.db("Xapi_Admin");
      let collection = database.collection("Reports");
      const cursor = await collection.find(filter);
      await cursor.forEach((element) => {
        reports.push(element);
      });
      return reports;
    } catch (error) {
      console.error(error);
    } finally {
      await client.close();
    }
  }

}
