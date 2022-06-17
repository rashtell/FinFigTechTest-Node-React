import * as jwt from "jsonwebtoken";

const key = "ThisKeyIsMeantToBeInTheEnvFile";

export const createToken = (payload) => {
  const signature = key;
  const expiration = "7d";

  return jwt.sign({ payload }, signature, { expiresIn: expiration });
};

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

export const getTokenDetailsFromRequest = (req) => {
  const token = getTokenFromHeader(req);
  const signature = key;
  const decodedToken = jwt.verify(token, signature, {});
  return decodedToken.payload;
};

export const getDetailsFromToken = (token) => {
  const signature = key;
  const decodedToken = jwt.verify(token, signature);
  return decodedToken.payload;
};
