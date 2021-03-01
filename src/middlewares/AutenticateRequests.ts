import { RedisService } from "./../services/RedisService";
import { Request, Response } from "express";
import { BearerTokenHeader } from "../helpers/String";
import { redisCli } from "../app";
const url = require("url");
const { ROUTE_RULES, MAX_ATTEMPTS } = require("./../config");

require("dotenv").config();

var jwt = require("jsonwebtoken");

const ValidateIpRequestAuth = async (
  req: Request,
  res: Response,
  next,
  path: string
) => {
  const _redisService = new RedisService(redisCli);

  // Get IP
  let ip =
    req.clientIp ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress;

  // Get Key Up Log
  let _KeyRedis = await _redisService.GetValueToken(ip.toString());

  // Number attempts
  let attempts: Number = +_KeyRedis["attempts"];

  // Exists Key
  if (_KeyRedis != null) {
    // is maximus attempts
    if (attempts >= MAX_ATTEMPTS) {
      return res.status(401).send({
        Message: "Number of attempts reached the limit, wait 10 minutes",
        auth: false,
      });
    } else {
      next();
    }
  }
};

const ValidateToken = async (
  req: Request,
  res: Response,
  next,
  path: string
) => {
  const _redisService = new RedisService(redisCli);
  // exists bearer
  if (req.headers["authorization"] == null) {
    res
      .status(401)
      .send({
        Message: "Bearer Token is required",
        auth: false,
      });
  }
  // Get bearer token
  var token = BearerTokenHeader(req.headers["authorization"]);
  // Valid Auth
  let _KeyRedis = await _redisService.GetValueToken(token);
  // Get route is request
  let route = path;
  // Get rules
  let rule = _KeyRedis["rule"];
  // Get IP
  let ip =
    req.clientIp ||
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress;

  // Is null?
  if (!token) {
    return res.status(401).send({ Message: "Invalid token", auth: false });
  }

  // Redis key exists?
  if (_KeyRedis == null) {
    return res.status(500).send({
      Message: "You are not authorized to perform this action",
      auth: false,
    });
  }

  // Is valid?
  jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ Message: "Failed to authenticate", auth: false });
    }
    // This ip is equal ip autenticate
    if (ip.toString() !== _KeyRedis["ip"]) {
      return res.status(500).send({
        Message: "You IP not autenticate",
        auth: false,
      });
    }
    // This rule is valid endpoint
    if (ROUTE_RULES[rule].indexOf(route) === -1) {
      return res.status(500).send({
        Message: "You are not authorized to perform this action",
        auth: false,
      });
    }
    next();
  });
};
export { ValidateToken, ValidateIpRequestAuth };
