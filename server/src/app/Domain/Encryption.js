import * as argon2 from "argon2";
const crypto = require("crypto");

/**
 * This function generates an hash of the specified length
 * @param {number} length
 * @returns string
 */
export const createDigest = (length) => {
  const secret = crypto.randomBytes(length);

  return crypto
    .createHmac("sha256", secret)
    .update("nigeria better better")
    .digest("hex");
};

/**
 * This method hashes a string
 * @param {string} plain
 * @returns hash
 */
export const createHash = async (plain) => {
  return argon2.hash(plain);
};

/**
 * This function verifes if the inputs are equivalent
 * @param {hash} hash
 * @param {string} plain
 * @returns boolean
 */
export const verifyHash = async (hash, plain) => {
  return argon2.verify(hash, plain);
};
