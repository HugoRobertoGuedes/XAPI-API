import { RedisService } from "./../services/RedisService";
import { Request, Response } from "express";
import { BearerTokenHeader } from "../helpers/String";
const { ROUTE_RULES } = require("./../config");

require("dotenv").config();

var jwt = require("jsonwebtoken");

const ValidateToken = async (req: Request, res: Response, next) => {
  const _redisService = new RedisService();

  // Get bearer token
  var token = BearerTokenHeader(req.headers["authorization"]);
  // Valid Auth
  let _KeyRedis = await _redisService.GetValueToken(token);
  // Get route is request
  let route = req.path;
  // Get rules
  let rule = _KeyRedis["rule"];

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
export { ValidateToken };
