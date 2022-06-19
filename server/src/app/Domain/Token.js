import * as jwt from "jsonwebtoken";

const key = "ThisKeyIsMeantToBeInTheEnvFile";

/**
 * This function creates jwt token for a given payload
 * @param {object} payload
 * @returns String
 */
export const createToken = (payload) => {
  const signature = key;
  const expiration = "7d";

  return jwt.sign({ payload }, signature, { expiresIn: expiration });
};

/**
 * This function gets out the authentication token from the request
 * @param {Request} req
 * @returns string
 */
export const getTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return null;
  }

  const splittedAuth = authorization.split(" ");

  if (splittedAuth[0] !== "Bearer" || !splittedAuth[1]) {
    return null;
  }

  return splittedAuth[1];
};

/**
 * This function gets the stored details in the jwt token from the request
 * @param {Request} req
 * @returns object
 */
export const getTokenDetailsFromRequest = (req) => {
  const token = getTokenFromHeader(req);
  const signature = key;
  const decodedToken = jwt.verify(token, signature, {});
  return decodedToken.payload;
};

/**
 * This function gets out the stored details in the jwt token
 * @param {string} token
 * @returns object
 */
export const getDetailsFromToken = (token) => {
  const signature = key;
  const decodedToken = jwt.verify(token, signature);
  return decodedToken.payload;
};
