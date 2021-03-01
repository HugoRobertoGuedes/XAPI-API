import console from "console";
import crypto from "crypto";

const algorithm = "aes-192-cbc";
const key = "lg1234";

function CreateHash256Hex(text: string) {
  return crypto.createHmac("sha256", key).update(text).digest("hex");
}

function CreateAes192cbc(text: string) {
  const buf = Buffer.alloc(10);
  let pass: string;
  let cipher = crypto.createCipheriv(algorithm, key,crypto.randomFillSync(buf).toString('hex'));
  pass = cipher.update(text, "utf8", "hex");
  return (pass += cipher.final("hex"));
}

let pass = CreateAes192cbc("senha1234");
console.log("3" + pass);
