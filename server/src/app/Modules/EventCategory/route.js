import { cGetEventCategories } from "./controller";

export const eventCategoryNoAuthRouter = require("express").Router();
eventCategoryNoAuthRouter.get("/get/event-categories", cGetEventCategories);

export default eventCategoryNoAuthRouter;
