import adminsAuthentication from "./Middleware/adminsAuthentication";
import { adminNoAuthRouter, adminRouter } from "./Modules/Admin/route";
import { eventNoAuthRouter } from "./Modules/Event/route";
import { eventCategoryNoAuthRouter } from "./Modules/EventCategory/route";

export default (app) => {
  app.use("/v1/admins", adminNoAuthRouter);
  app.use("/v1/admins", adminsAuthentication, adminRouter);

  app.use("/v1/events", eventNoAuthRouter);
  app.use("/v1/events", eventCategoryNoAuthRouter);
};
