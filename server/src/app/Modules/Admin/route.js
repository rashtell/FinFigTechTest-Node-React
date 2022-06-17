import { eventRouter } from "../Event/route";
import {
  cCreateAdmin,
  cGetAdmin,
  cLoginAdmin,
  cLogoutAdmin,
} from "./controller";

export const adminNoAuthRouter = require("express").Router();
adminNoAuthRouter.post("/login/admin", cLoginAdmin);
adminNoAuthRouter.post("/create/admin", cCreateAdmin);

export const adminRouter = require("express").Router();
adminRouter.get("/get/admin", cGetAdmin);
adminRouter.post("/logout/admin", cLogoutAdmin);

adminRouter.use("/events", eventRouter);
