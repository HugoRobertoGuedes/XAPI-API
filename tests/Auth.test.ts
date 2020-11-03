const express = require("express");
const request = require("supertest");
const bodyParser = require("body-parser");
const requestIp = require("request-ip");

import { RedisService } from "../src/services/RedisService";
import { AuthRoute } from "./../src/routes/Autentication/AutenticationRoutes";

const redis = new RedisService();

const app = express();
app.use(bodyParser.json());
app.use(AuthRoute);
app.enable("trust proxy");
app.use(requestIp.mw());

describe("Testing autentication", () => {
  // LRS
  it("POST /auth/lrs - success", async (done) => {
    const { body } = await request(app)
      .post("/auth/lrs")
      .set("X-Forwarded-For", "192.168.2.1")
      .set("Remote-Addr", "192.168.2.1")
      .set("X-ProxyUser-Ip", "192.168.2.1")
      .set("X-Client-IP", "192.168.2.1")
      .set("X-Real-IP", "192.168.2.1")
      .send({
        user: "hugo.guedes@lg.com.br",
        pass: "ygd6t8",
        tokenExpire: 1000,
      });
    expect(body).toMatchObject({
      Ok: true,
      Message: "Authenticated application valid for 1000 ms",
      Obj: {
        NomeCompleto: "Hugo Roberto Guedes",
        NomeUsuario: "hugo.guedes@lg.com.br",
        Email: "hugo.guedes@lg.com.br",
        Telefone: "14996001481",
        Tipo: "ROOT",
        Token: expect.any(String),
      },
    });
    await redis.FlushAll();
    done();
  });
  // App
  it("POST /auth/app - success", async (done) => {
    const { body } = await request(app)
      .post("/auth/app")
      .set("X-Forwarded-For", "192.168.2.1")
      .set("Remote-Addr", "192.168.2.1")
      .set("X-ProxyUser-Ip", "192.168.2.1")
      .set("X-Client-IP", "192.168.2.1")
      .set("X-Real-IP", "192.168.2.1")
      .send({
        user: "appfortestingapitwo",
        pass: "6gzts",
      });
    expect(body).toMatchObject({
      Ok: true,
      Message: "Authenticated application valid for 2 hours",
      Obj: {
        Titulo: "App for testing Api two2",
        Descricao: "This is a testing new feature API two2",
        Status: true,
        Dt_Criacao: "2020-10-05T12:37:50.497Z",
        Token_App:
          "cb0acdd26560ae38a1909548d58b65b7f549d72f6d3ee60da0948d437379a5f1",
        Token: expect.any(String),
      },
    });
    await redis.FlushAll();
    done();
  });
  // User App
  it("POST /auth/app/user - success", async (done) => {
    const { body } = await request(app)
      .post("/auth/app/user")
      .set("X-Forwarded-For", "192.168.2.1")
      .set("Remote-Addr", "192.168.2.1")
      .set("X-ProxyUser-Ip", "192.168.2.1")
      .set("X-Client-IP", "192.168.2.1")
      .set("X-Real-IP", "192.168.2.1")
      .send({
        user: "testinguser",
        pass: "a58qwv",
        tokenApp:
          "cb0acdd26560ae38a1909548d58b65b7f549d72f6d3ee60da0948d437379a5f1",
      });
    expect(body).toMatchObject({
      Ok: true,
      Message: "Authenticated application valid for 2 hours",
      Obj: {
        Nome: "Testing User",
        Documento: "47896547852",
        Email: "testing@teste.com",
        Aplicacao: {
          Titulo: "App for testing Api two2",
          Descricao: "This is a testing new feature API two2",
          Status: true,
          Dt_Criacao: "2020-10-05T12:37:50.497Z",
          Token_App:
            "cb0acdd26560ae38a1909548d58b65b7f549d72f6d3ee60da0948d437379a5f1",
        },
        Token: expect.any(String),
      },
    });
    await redis.FlushAll();
    done();
  });
});
