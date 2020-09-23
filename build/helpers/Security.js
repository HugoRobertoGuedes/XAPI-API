"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = void 0;
require("dotenv").config();
var crypto = require("crypto");
const algorithm = "aes-256-ctr";
const password = process.env.SECRET_KEY;
function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, password);
    var crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
}
exports.encrypt = encrypt;
function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, password);
    var dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
}
exports.decrypt = decrypt;
