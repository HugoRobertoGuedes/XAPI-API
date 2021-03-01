"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateIpRequestAuth = exports.ValidateToken = void 0;
const RedisService_1 = require("./../services/RedisService");
const String_1 = require("../helpers/String");
const app_1 = require("../app");
const url = require("url");
const { ROUTE_RULES, MAX_ATTEMPTS } = require("./../config");
require("dotenv").config();
var jwt = require("jsonwebtoken");
const ValidateIpRequestAuth = async (req, res, next, path) => {
    const _redisService = new RedisService_1.RedisService(app_1.redisCli);
    // Get IP
    let ip = req.clientIp ||
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress;
    // Get Key Up Log
    let _KeyRedis = await _redisService.GetValueToken(ip.toString());
    // Number attempts
    let attempts = +_KeyRedis["attempts"];
    // Exists Key
    if (_KeyRedis != null) {
        // is maximus attempts
        if (attempts >= MAX_ATTEMPTS) {
            return res.status(401).send({
                Message: "Number of attempts reached the limit, wait 10 minutes",
                auth: false,
            });
        }
        else {
            next();
        }
    }
};
exports.ValidateIpRequestAuth = ValidateIpRequestAuth;
const ValidateToken = async (req, res, next, path) => {
    const _redisService = new RedisService_1.RedisService(app_1.redisCli);
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
    var token = String_1.BearerTokenHeader(req.headers["authorization"]);
    // Valid Auth
    let _KeyRedis = await _redisService.GetValueToken(token);
    // Get route is request
    let route = path;
    // Get rules
    let rule = _KeyRedis["rule"];
    // Get IP
    let ip = req.clientIp ||
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
exports.ValidateToken = ValidateToken;
