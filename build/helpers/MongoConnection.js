"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientMongo = exports.URI = void 0;
const mongodb_1 = require("mongodb");
const { MONGO_DB_HOST, MONGO_DB_PORT, MONGO_DB_AUTH, MONGO_DB_USER, MONGO_DB_PASS, } = require("./../config");
exports.URI = `mongodb://${MONGO_DB_USER}:${encodeURIComponent(MONGO_DB_PASS)}@${MONGO_DB_HOST}/admin?authSource=admin&authMechanism=${MONGO_DB_AUTH}`;
exports.ClientMongo = new mongodb_1.MongoClient(exports.URI, { useUnifiedTopology: true });
