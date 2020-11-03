const express = require("express");
const request = require("supertest");
const bodyParser = require("body-parser");
const requestIp = require("request-ip");

import { AuthRoute } from "../src/routes/Autentication/AutenticationRoutes";
import { RedisService } from "../src/services/RedisService";
import { LrsRoutes } from "./../src/routes/Lrs/LrsRoutes";

const app = express();
app.use(bodyParser.json());
app.use(LrsRoutes);
app.use(AuthRoute);
app.enable("trust proxy");
app.use(requestIp.mw());

const redis = new RedisService();

var token = "";

describe("Testing endpoints LRS", () => {
  // Generate Token Login LRS
  it("POST /auth/lrs - success", async (done) => {
    await redis.FlushAll();
    const { body } = await request(app)
      .post("/auth/lrs")
      .set("X-Forwarded-For", "192.168.2.1")
      .set("Accept", "application/json")
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
    token = body.Obj.Token;
    done();
  });

  //#region Entity
  it("POST add existis Entity /entity", async (done) => {
    const { body } = await request(app)
      .post("/entity")
      .set("X-Forwarded-For", "192.168.2.1")
      .set("Remote-Addr", "192.168.2.1")
      .set("X-ProxyUser-Ip", "192.168.2.1")
      .set("X-Client-IP", "192.168.2.1")
      .set("X-Real-IP", "192.168.2.1")
      .set("authorization", "Bearer " + token)
      .send({
        Nome: "Manuel e Vanessa Telas Ltda",
        Documento: "64194543000170",
        Email: "sac@manuelevanessatelasltda.com.br",
        Telefone: 1126283664,
      });

    expect(body).toMatchObject({
      Message: "A document already exists",
      Ok: false,
      Obj: {},
    });
    done();
  });

  it("GET search entity /entity", async (done) => {
    await request(app)
      .get(
        "/entity?nome=Manuel e Vanessa Telas Ltda&documento=&email=&telefone="
      )
      .set("X-Forwarded-For", "192.168.2.1")
      .set("Remote-Addr", "192.168.2.1")
      .set("X-ProxyUser-Ip", "192.168.2.1")
      .set("X-Client-IP", "192.168.2.1")
      .set("X-Real-IP", "192.168.2.1")
      .set("authorization", "Bearer " + token)
      .then((respo) => {
        expect(respo.body).toMatchObject({
          Message: "Entities",
          Ok: true,
          Obj: [
            {
              _id: "5f6cf394398f5fba6ee1dbb7",
              Nome: "Manuel e Vanessa Telas Ltda",
              Email: "sac@manuelevanessatelasltda.com.br",
              Telefone: "1126283664",
              Documento: "64194543000170",
              Dt_Create: "2020-09-24T19:29:24.634Z",
              Dt_Att: "2020-09-24T19:29:24.634Z",
              Status: true,
              Db_Name: "Xapi_Db_manuelevanessatelasltda",
            },
          ],
        });
      });
    done();
  });
  //#endregion

  //#region Applications
  it("POST Add new user app", async (done) => {
    const { body } = await request(app)
      .post("/app/user")
      .set("X-Forwarded-For", "192.168.2.1")
      .set("Remote-Addr", "192.168.2.1")
      .set("X-ProxyUser-Ip", "192.168.2.1")
      .set("X-Client-IP", "192.168.2.1")
      .set("X-Real-IP", "192.168.2.1")
      .set("authorization", "Bearer " + token)
      .send({
        Nome: "Testing User",
        Email: "testing@teste.com",
        Documento: "47896547852",
        Aplicacoes_Cadastradas: ["5f7b139e86f297176c2eaa42"],
        Usuario_Criacao_Id: "5f4fcfdf2e2da52781e53d18",
      });

    expect(body).toMatchObject({
      Message: "Email is already in use",
      Ok: false,
      Obj: {},
    });
    done();
  });

  it("GET Search apps /app", async (done) => {
    await request(app)
      .get("/app")
      .set("X-Forwarded-For", "192.168.2.1")
      .set("Remote-Addr", "192.168.2.1")
      .set("X-ProxyUser-Ip", "192.168.2.1")
      .set("X-Client-IP", "192.168.2.1")
      .set("X-Real-IP", "192.168.2.1")
      .set("authorization", "Bearer " + token)
      .send({
        Titulo: "two2",
        Entidade_Id: "",
      })
      .then((respo) => {
        expect(respo.body).toMatchObject({
          Message: "Aplications",
          Ok: true,
          obj: [
            {
              _id: "5f7b139e86f297176c2eaa42",
              Titulo: "App for testing Api two2",
              Descricao: "This is a testing new feature API two2",
              Entidade_Id: "5f4faaa82e2da52781e53cff",
              Dt_Att: "2020-10-05T12:37:50.497Z",
              Dt_Create: "2020-10-05T12:37:50.497Z",
              Status: true,
              Auth_Usuario: {
                pass:
                  "658ca1c5167e5c69c450644ac693c3c22bb631ab00845791e406ee241ffa4423",
                user: "appfortestingapitwo",
              },
              Token_Expire: 10000,
              Token_App:
                "cb0acdd26560ae38a1909548d58b65b7f549d72f6d3ee60da0948d437379a5f1",
            },
          ],
        });
      });
    await redis.FlushAll();
    done();
  });
  //#endregion
});
