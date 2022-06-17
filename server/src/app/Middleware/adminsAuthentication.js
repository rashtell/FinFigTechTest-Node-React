import { LogError } from "../Domain/Logger";
import { getTokenDetailsFromRequest } from "../Domain/Token";
import { mAuthenticate } from "../Modules/Admin/repository";

export default async (req, res, next) => {
  let decodedToken = null;
  try {
    decodedToken = getTokenDetailsFromRequest(req);
  } catch (error) {
    LogError("middleware: adminsAuthentication: " + error);
    return res.status(400).json({
      type: "error",
      msg: "Invalid request",
      data: null,
      extra: null,
    });
  }

  const isAuthenticated = await mAuthenticate(decodedToken);

  if (!isAuthenticated) {
    return res.status(400).json({
      type: "error",
      msg: "Expired session. Please login",
      data: null,
      extra: null,
    });
  } else {
    return next();
  }
};
