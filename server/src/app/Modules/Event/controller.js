import { getTokenDetailsFromRequest } from "../../Domain/Token";
import { validateRequired } from "../../Domain/Validation";
import {
  mCreateEvent,
  mDeleteEvent,
  mGetEvents,
  mSearchEvent,
  mUpdateEvent,
} from "./repository";

//#region Admin
export async function cCreateEvent(req, res) {
  try {
    //validate required inputs are set
    validateRequired(req, [
      { name: "data.title", text: "Title" },
      { name: "data.category", text: "Category" },
      { name: "data.date", text: "Date" },
    ]);

    const { title, description, category, date, isVirtual, address } =
      req.body.data;
    const { _id: adminID } = getTokenDetailsFromRequest(req);

    //create event
    const event = await mCreateEvent({
      adminID,
      title,
      description,
      category,
      date,
      isVirtual,
      address,
    });

    return res.status(200).json({
      type: "success",
      mgs: "",
      data: event,
      extra: null,
    });
  } catch (err) {
    return res.status(400).json({
      type: "error",
      mgs: err.message,
      data: null,
      extra: null,
    });
  }
}

export async function cGetEvents(req, res) {
  try {
    const { _id: adminID } = getTokenDetailsFromRequest(req);

    //create event
    const events = await mGetEvents(null, null, null, { adminID });

    return res.status(200).json({
      type: "success",
      mgs: "",
      data: events,
      extra: null,
    });
  } catch (err) {
    return res.status(400).json({
      type: "error",
      mgs: err.message,
      data: null,
      extra: null,
    });
  }
}

export async function cUpdateEvent(req, res) {
  try {
    //validate required inputs are set
    validateRequired(req, [
      { name: "data.title", text: "Title" },
      { name: "data.category", text: "Category" },
      { name: "data.date", text: "Date" },
    ]);

    const { title, description, category, date, isVirtual, address } =
      req.body.data;
    const eventID = req.params.id;
    const { _id: adminID } = getTokenDetailsFromRequest(req);

    //update event
    const event = await mUpdateEvent(
      { _id: eventID, adminID },
      {
        title,
        description,
        category,
        date,
        isVirtual,
        address,
      }
    );

    return res.status(200).json({
      type: "updated",
      mgs: "",
      data: event,
      extra: null,
    });
  } catch (err) {
    return res.status(400).json({
      type: "error",
      mgs: err.message,
      data: null,
      extra: null,
    });
  }
}

export async function cDeleteEvent(req, res) {
  try {
    const eventID = req.params.id;
    const { _id: adminID } = getTokenDetailsFromRequest(req);

    //delete event
    const event = await mDeleteEvent({ _id: eventID, adminID });

    return res.status(200).json({
      type: "deleted",
      mgs: "",
      data: event,
      extra: null,
    });
  } catch (err) {
    return res.status(400).json({
      type: "error",
      mgs: err.message,
      data: null,
      extra: null,
    });
  }
}
//#endregion

//#region User

export async function cSearchEvent(req, res) {
  try {
    const { title, categories, dateRange, isVirtual, address } = req.body.data;

    //search event
    const events = await mSearchEvent({
      title,
      categories,
      dateRange,
      isVirtual,
      address,
    });

    return res.status(200).json({
      type: "success",
      mgs: "",
      data: events,
      extra: null,
    });
  } catch (err) {
    return res.status(400).json({
      type: "error",
      mgs: err.message,
      data: null,
      extra: null,
    });
  }
}
//#endregion
