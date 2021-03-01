"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const MongoConnection_1 = require("./../../helpers/MongoConnection");
const mongodb_1 = require("mongodb");
class AuthRepository {
    constructor() { }
    /**
     * Find User Lrs
     * @param auth Auth Model
     */
    async FindUserlrsByAuth(auth) {
        const client = new mongodb_1.MongoClient(MongoConnection_1.URI, { useUnifiedTopology: true });
        await client.connect();
        let app;
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
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            await client.close();
        }
    }
    /**
     *
     * @param token Token App generate to register
     */
    async FindAppByToken(token) {
        const client = new mongodb_1.MongoClient(MongoConnection_1.URI, { useUnifiedTopology: true });
        await client.connect();
        let app;
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
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            await client.close();
        }
    }
    /**
     * Return App by autentication user
     * @param auth Model Auth
     * @param tokenApp Token to App
     */
    async FindAppByAuth(auth) {
        const client = new mongodb_1.MongoClient(MongoConnection_1.URI, { useUnifiedTopology: true });
        await client.connect();
        let app;
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
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            await client.close();
        }
    }
    /**
     * Return App user
     * @param auth Auth Model
     */
    async FindUserApp(auth) {
        const client = new mongodb_1.MongoClient(MongoConnection_1.URI, { useUnifiedTopology: true });
        await client.connect();
        let app;
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
        }
        catch (error) {
            throw new Error(error);
        }
        finally {
            await client.close();
        }
    }
}
exports.AuthRepository = AuthRepository;
