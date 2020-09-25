import { Auth } from "./../models/Auth";
import { Aplicacao } from "./../models/Aplicacao";

const Redis = require("ioredis");

const { REDIS_HOST, REDIS_PORT } = require("./../config");

export class RedisService {
  private readonly client;

  constructor() {
    let port: string = REDIS_PORT
    let host: string = REDIS_HOST
    this.client = new Redis(port, host);
  }

  async SaveTokenAutenticateApp(
    token: string,
    app: Aplicacao,
    dbName: string
  ): Promise<void> {
    await this.client.hmset(token, {
      tokenApp: app.Token_App,
      rule: "APP",
      title: app.Titulo,
      dbName: dbName,
    });
    await this.client.expire(token, app.Token_Expire);
  }

  async SaveTokenAutenticateUserApp(
    token: string,
    app: Aplicacao,
    dbName: string,
    auth: Auth
  ): Promise<void> {
    await this.client.hmset(token, {
      tokenApp: app.Token_App,
      rule: "USER",
      title: app.Titulo,
      dbName: dbName,
      user: auth.user,
    });
    await this.client.expire(token, app.Token_Expire);
  }

  async SaveTokenAutenticateLrs(
    token: string,
    auth: Auth,
    expireTime: number
  ): Promise<void> {
    await this.client.hmset(token, {
      rule: "LRS",
      user: auth.user,
    });
    await this.client.expire(token, expireTime);
  }

  async GetValueToken(token: string): Promise<any> {
    let obj = await this.client.hgetall(token);
    return obj;
  }
}
