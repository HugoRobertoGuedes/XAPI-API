import { Auth } from "./../models/Auth";
import { Application } from "../models/Application";
import { RedisClient } from "redis";

export class RedisService {
  private readonly client;

  constructor(redis: RedisClient) {
    this.client = redis;
  }

  async FlushAll() {
    await this.client.flushall();
  }

  async SaveTokenAutenticateApp(
    token: string,
    app: Application,
    dbName: string,
    ip: string
  ): Promise<void> {
    await this.client.hmset(token, {
      tokenApp: app.Token_App,
      rule: "APP",
      title: app.Title,
      dbName: dbName,
      ip: ip,
    });
    await this.client.expire(token, app.Token_Expire);
  }

  async SaveIpattemptAuth(
    ip: string,
    date: Date,
    status: boolean
  ): Promise<void> {
    let exists = await this.GetValueToken(ip);
    let attempsKey: number = +exists["attempts"];
    await this.client.hmset(ip, {
      date: date,
      ip: ip,
      auth: status,
      attempts: exists["attempts"] != null ? attempsKey + 1 : 1,
    });
    await this.client.expire(ip, 600);
  }

  async SaveTokenAutenticateUserApp(
    token: string,
    app: Application,
    dbName: string,
    auth: Auth,
    ip: string
  ): Promise<void> {
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

  async SaveTokenAutenticateLrs(
    token: string,
    ip: string,
    auth: Auth,
    expireTime: number
  ): Promise<void> {
    await this.client.hmset(token, {
      rule: "LRS",
      user: auth.user,
      ip: ip,
    });
    await this.client.expire(token, expireTime);
  }

  async GetValueToken(token: string): Promise<any> {
    let obj = await this.client.hgetall(token);
    return obj;
  }
}
