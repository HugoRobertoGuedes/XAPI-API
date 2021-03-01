import { MongoClient } from 'mongodb';
const {
  MONGO_DB_HOST,
  MONGO_DB_PORT,
  MONGO_DB_AUTH,
  MONGO_DB_USER,
  MONGO_DB_PASS,
} = require("./../config");

export const URI = `mongodb://${MONGO_DB_USER}:${encodeURIComponent(MONGO_DB_PASS)}@${MONGO_DB_HOST}/admin?authSource=admin&authMechanism=${MONGO_DB_AUTH}`;

export const ClientMongo = new MongoClient(URI, { useUnifiedTopology: true });