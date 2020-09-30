const express = require("express");
const request = require("supertest");
const bodyParser = require("body-parser");

import { AuthRoute } from "./../src/routes/Autentication/AutenticationRoutes";

const app = express();
app.use(bodyParser.json());
app.use(AuthRoute);

describe("Testing autentication", () => {
  // LRS
  it("POST /auth/lrs - success", async (done) => {
    const { body } = await request(app).post("/auth/lrs").send({
      user: "hugo.guedes",
      pass: "078156FD9DEBB7D481347E68AB19BB1F2D3028BCD61BC25994562F8A0D62E8E1",
      tokenExpire: 1000,
    });
    expect(body).toMatchObject({
      Ok: true,
      Message: "Authenticated application valid for 1000 ms",
      Obj: {
        NomeCompleto: "Hugo Roberto Guedes",
        NomeUsuario: "hugo.guedes",
        Email: "hugo.guedes@lg.com.br",
        Telefone: "55149960014810",
        Tipo: "Root",
        Token: expect.any(String),
      },
    });
    done();
  });
  // App
  it("POST /auth/app - success", async (done) => {
    const { body } = await request(app).post("/auth/app").send({
      user: "apptesting",
      pass: "078156FD9DEBB7D481347E68AB19BB1F2D3028BCD61BC25994562F8A0D62E8E1",
    });
    expect(body).toMatchObject({
      Ok: true,
      Message: "Authenticated application valid for 2 hours",
      Obj: {
        Titulo: "App For Testing",
        Descricao: "This is a teste",
        Status: true,
        Dt_Criacao: "2020-09-02T16:51:38.148Z",
        Token_App:
          "cac8516992f24a6d595ac60f9259966ee2f12b019ee55be1e6dd8513e2dd9b32",
        Token: expect.any(String),
      },
    });
    done();
  });
  // User App
  it("POST /auth/app/user - success", async (done) => {
    const { body } = await request(app).post("/auth/app/user").send({
      user: "mauricio.souza",
      pass: "078156FD9DEBB7D481347E68AB19BB1F2D3028BCD61BC25994562F8A0D62E8E1",
      tokenApp:
        "cac8516992f24a6d595ac60f9259966ee2f12b019ee55be1e6dd8513e2dd9b32",
    });
    expect(body).toMatchObject({
      Ok: true,
      Message: "Authenticated application valid for 2 hours",
      Obj: {
        Nome: "Mauricio Souza",
        Documento: "45874198625",
        Email: "mauricio.souza@email.com",
        Aplicacao: {
          Titulo: "App For Testing",
          Descricao: "This is a teste",
          Status: true,
          Dt_Criacao: "2020-09-02T16:51:38.148Z",
          Token_App:
            "cac8516992f24a6d595ac60f9259966ee2f12b019ee55be1e6dd8513e2dd9b32",
        },
        Token: expect.any(String),
      },
    });
    done();
  });
});
