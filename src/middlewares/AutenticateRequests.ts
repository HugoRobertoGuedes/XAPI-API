import { RedisService } from "./../services/RedisService";
import { Request, Response } from "express";
import { BearerTokenHeader } from "../helpers/String";

require("dotenv").config();

var jwt = require("jsonwebtoken");

const ValidateToken = async (req: Request, res: Response, next) => {
  // Get bearer token
  var token = BearerTokenHeader(req.headers["authorization"]);

  // Is null?
  if (!token) {
    return res.status(401).send({ Message: "Invalid token", auth: false });
  }

  // Is valid?
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ Message: "Failed to authenticate", auth: false });
    }
    next();
  });
};

export { ValidateToken };
