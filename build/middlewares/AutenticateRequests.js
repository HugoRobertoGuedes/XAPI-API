"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateToken = void 0;
const String_1 = require("../helpers/String");
require("dotenv").config();
var jwt = require("jsonwebtoken");
const ValidateToken = async (req, res, next) => {
    // Get bearer token
    var token = String_1.BearerTokenHeader(req.headers["authorization"]);
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
exports.ValidateToken = ValidateToken;
