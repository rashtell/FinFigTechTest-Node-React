import * as argon2 from "argon2";
const crypto = require("crypto");

export const createDigest = (length) => {
  const secret = crypto.randomBytes(length);

  const hash = crypto
    .createHmac("sha256", secret)
    .update("nigeria better better")
    .digest("hex");
  return hash;
};

export const createHash = async (plain) => {
  return argon2.hash(plain);
};

export const verifyHash = async (hash, plain) => {
  return argon2.verify(hash, plain);
};
