"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const Redis = require("ioredis");
const { REDIS_HOST, REDIS_PORT } = require("./../config");
class RedisService {
    constructor() {
        let port = REDIS_PORT;
        let host = REDIS_HOST;
        this.client = new Redis(port, host);
    }
    async SaveTokenAutenticateApp(token, app, dbName) {
        await this.client.hmset(token, {
            tokenApp: app.Token_App,
            rule: "APP",
            title: app.Titulo,
            dbName: dbName,
        });
        await this.client.expire(token, app.Token_Expire);
    }
    async SaveTokenAutenticateUserApp(token, app, dbName, auth) {
        await this.client.hmset(token, {
            tokenApp: app.Token_App,
            rule: "USER",
            title: app.Titulo,
            dbName: dbName,
            user: auth.user,
        });
        await this.client.expire(token, app.Token_Expire);
    }
    async SaveTokenAutenticateLrs(token, auth, expireTime) {
        await this.client.hmset(token, {
            rule: "LRS",
            user: auth.user,
        });
        await this.client.expire(token, expireTime);
    }
    async GetValueToken(token) {
        let obj = await this.client.hgetall(token);
        return obj;
    }
}
exports.RedisService = RedisService;
