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

  async FlushAll(){
    await this.client.flushall();
  }

  async SaveTokenAutenticateApp(
    token: string,
    app: Aplicacao,
    dbName: string,
    ip: string
  ): Promise<void> {
    await this.client.hmset(token, {
      tokenApp: app.Token_App,
      rule: "APP",
      title: app.Titulo,
      dbName: dbName,
      ip: ip
    });
    await this.client.expire(token, app.Token_Expire);
  }

  async SaveIpattemptAuth(
    ip: string,
    date: Date,
    status: boolean
  ): Promise<void> {
    let exists = await this.GetValueToken(ip);
    let attempsKey: number = +exists['attempts'];
    await this.client.hmset(ip, {
      date: date,
      ip: ip,
      auth: status,
      attempts: (exists['attempts'] != null) ? attempsKey  + 1  : 1
    });
    await this.client.expire(ip, 600);
  }


  async SaveTokenAutenticateUserApp(
    token: string,
    app: Aplicacao,
    dbName: string,
    auth: Auth,
    ip: string
  ): Promise<void> {
    await this.client.hmset(token, {
      tokenApp: app.Token_App,
      rule: "USER",
      title: app.Titulo,
      dbName: dbName,
      user: auth.user,
      ip: ip
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
      ip: ip
    });
    await this.client.expire(token, expireTime);
  }

  async GetValueToken(token: string): Promise<any> {
    let obj = await this.client.hgetall(token);
    return obj;
  }
}
