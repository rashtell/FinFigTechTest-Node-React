import {
  cCreateEvent,
  cDeleteEvent,
  cGetEvents,
  cSearchEvent,
  cUpdateEvent,
} from "./controller";

export const eventRouter = require("express").Router();

eventRouter.post("/create/event", cCreateEvent);
eventRouter.get("/get/events", cGetEvents);
eventRouter.patch("/update/event/:id", cUpdateEvent);
eventRouter.delete("/delete/event/:id", cDeleteEvent);

export const eventNoAuthRouter = require("express").Router();
eventNoAuthRouter.post("/search/event", cSearchEvent);
