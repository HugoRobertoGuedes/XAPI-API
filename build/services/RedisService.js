"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
class RedisService {
    constructor(redis) {
        this.client = redis;
    }
    async FlushAll() {
        await this.client.flushall();
    }
    async SaveTokenAutenticateApp(token, app, dbName, ip) {
        await this.client.hmset(token, {
            tokenApp: app.Token_App,
            rule: "APP",
            title: app.Title,
            dbName: dbName,
            ip: ip,
        });
        await this.client.expire(token, app.Token_Expire);
    }
    async SaveIpattemptAuth(ip, date, status) {
        let exists = await this.GetValueToken(ip);
        let attempsKey = +exists["attempts"];
        await this.client.hmset(ip, {
            date: date,
            ip: ip,
            auth: status,
            attempts: exists["attempts"] != null ? attempsKey + 1 : 1,
        });
        await this.client.expire(ip, 600);
    }
    async SaveTokenAutenticateUserApp(token, app, dbName, auth, ip) {
        await this.client.hmset(token, {
            tokenApp: app.Token_App,
            rule: "USER",
            title: app.Title,
            dbName: dbName,
            user: auth.user,
            ip: ip,
        });
        await this.client.expire(token, app.Token_Expire);
    }
    async SaveTokenAutenticateLrs(token, ip, auth, expireTime) {
        await this.client.hmset(token, {
            rule: "LRS",
            user: auth.user,
            ip: ip,
        });
        await this.client.expire(token, expireTime);
    }
    async GetValueToken(token) {
        let obj = await this.client.hgetall(token);
        return obj;
    }
}
exports.RedisService = RedisService;
