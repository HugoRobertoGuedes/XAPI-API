const express = require("express");
const request = require("supertest");
const bodyParser = require("body-parser");
const requestIp = require("request-ip");

import { AuthRoute } from "./../src/routes/Autentication/AutenticationRoutes";
import { RedisService } from "../src/services/RedisService";

const redis = new RedisService();
const app = express();
app.use(bodyParser.json());
app.use(AuthRoute);
app.enable("trust proxy");
app.use(requestIp.mw());

describe("Testing security api", () => {
  // Validation user LRS
  it("POST user doens't exists /auth/lrs", async (done) => {
    const { body } = await request(app)
      .post("/auth/lrs")
      .set("X-Forwarded-For", "192.168.2.1")
      .set("Remote-Addr", "192.168.2.1")
      .set("X-ProxyUser-Ip", "192.168.2.1")
      .set("X-Client-IP", "192.168.2.1")
      .set("X-Real-IP", "192.168.2.1")
      .send({
        user: "hugo.guedes@lg.com.br",
        pass: "ygd6t8E",
        tokenExpire: 1000,
      });
    expect(body).toMatchObject({
      Message: "Error: User doens't exists",
      Ok: false,
      Obj: {},
    });
    done();
  });

  // Validation user APP
  it("POST user doens't exists /auth/app", async (done) => {
    const { body } = await request(app)
      .post("/auth/app")
      .set("X-Forwarded-For", "192.168.2.1")
      .set("Remote-Addr", "192.168.2.1")
      .set("X-ProxyUser-Ip", "192.168.2.1")
      .set("X-Client-IP", "192.168.2.1")
      .set("X-Real-IP", "192.168.2.1")
      .send({
        user: "appfortestingapitwo",
        pass: "6gztsE",
      });
    expect(body).toMatchObject({
      Message: "Error: No applications found with this user",
      Ok: false,
      Obj: {},
    });
    done();
  });

  // Validation users APP
  it("POST user doens't exists /auth/app/user", async (done) => {
    const { body } = await request(app)
      .post("/auth/app/user")
      .set("X-Forwarded-For", "192.168.2.1")
      .set("Remote-Addr", "192.168.2.1")
      .set("X-ProxyUser-Ip", "192.168.2.1")
      .set("X-Client-IP", "192.168.2.1")
      .set("X-Real-IP", "192.168.2.1")
      .send({
        user: "testinguser",
        pass: "a58qwvE",
        tokenApp:
          "cb0acdd26560ae38a1909548d58b65b7f549d72f6d3ee60da0948d437379a5f1",
      });
    expect(body).toMatchObject({
      Message: "Error: Application not found/user not found",
      Ok: false,
      Obj: {},
    });
    done();
  });

  // Validation attempts
  it("POST max attemps logins - attempt 4", async (done) => {
    const { body } = await request(app)
      .post("/auth/lrs")
      .set("X-Forwarded-For", "192.168.2.1")
      .set("Remote-Addr", "192.168.2.1")
      .set("X-ProxyUser-Ip", "192.168.2.1")
      .set("X-Client-IP", "192.168.2.1")
      .set("X-Real-IP", "192.168.2.1")
      .send({
        user: "hugo.guedes@lg.com.br",
        pass: "ygd6t8E",
        tokenExpire: 1000,
      });
    expect(body).toMatchObject({
      Message: "Error: User doens't exists",
      Ok: false,
      Obj: {},
    });
    done();
  });

  // Validation attempts
  it("POST max attemps logins - final attempt ", async (done) => {
    const { body } = await request(app)
      .post("/auth/lrs")
      .set("X-Forwarded-For", "192.168.2.1")
      .set("Remote-Addr", "192.168.2.1")
      .set("X-ProxyUser-Ip", "192.168.2.1")
      .set("X-Client-IP", "192.168.2.1")
      .set("X-Real-IP", "192.168.2.1")
      .send({
        user: "hugo.guedes@lg.com.br",
        pass: "ygd6t8E",
        tokenExpire: 1000,
      });

    expect(body).toMatchObject({
      Message: "Number of attempts reached the limit, wait 10 minutes",
      auth: false,
    });
    await redis.FlushAll();
    done();
  });
});
