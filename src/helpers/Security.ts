require("dotenv").config();

var crypto = require("crypto");

const algorithm = "aes-256-ctr";
const ENCRYPTION_KEY = process.env.SECRET_KEY; // Must be 256 bits (32 characters)
const TYPE_CRYPTO = "hex";

function encrypt(senha) {
  const hash = crypto
    .createHmac("sha256", ENCRYPTION_KEY)
    .update(senha)
    .digest(TYPE_CRYPTO);
  return hash;
}

export { encrypt };
