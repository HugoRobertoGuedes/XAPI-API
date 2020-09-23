"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementRepository = void 0;
const { MongoClient } = require("mongodb");
const MongoConnection_1 = require("../../helpers/MongoConnection");
class StatementRepository {
    constructor() { }
    async InserirNovoStatement(db, statement) {
        const client = new MongoClient(MongoConnection_1.URI, { useUnifiedTopology: true });
        await client.connect();
        try {
            const database = client.db(db);
            var collection = database.collection("Statement");
            const result = await collection.insertOne(statement);
            return result.ops;
        }
        catch (error) {
            console.error(error);
        }
        finally {
            await client.close();
        }
    }
    async BuscarStatementPorFiltro(db, filter) {
        const client = new MongoClient(MongoConnection_1.URI, { useUnifiedTopology: true });
        await client.connect();
        try {
            const state = [];
            const database = client.db(db);
            var collection = database.collection("Statement");
            var query = filter;
            var result = await collection.find(query);
            await result.forEach((element) => {
                state.push(element);
            });
            return state;
        }
        catch (error) {
            console.error(error);
        }
        finally {
            await client.close();
        }
    }
    async BuscarAppPorTokenApp(token) {
        const client = new MongoClient(MongoConnection_1.URI, { useUnifiedTopology: true });
        await client.connect();
        try {
            let app;
            const database = client.db("Xapi_Admin");
            let collection = database.collection("Aplicacoes");
            var query = {
                Token_App: token,
            };
            const cursor = await collection.find(query);
            await cursor.forEach((element) => {
                app = element;
            });
            return app;
        }
        catch (error) {
            console.error(error);
        }
        finally {
            await client.close();
        }
    }
    async ObterNomeDatabasePorEntidadeId(id) {
        const client = new MongoClient(MongoConnection_1.URI, { useUnifiedTopology: true });
        await client.connect();
        try {
            let db;
            const database = client.db("Xapi_Admin");
            let collection = database.collection("Entidades");
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
        }
        catch (error) {
            console.error(error);
        }
        finally {
            await client.close();
        }
    }
}
exports.StatementRepository = StatementRepository;
