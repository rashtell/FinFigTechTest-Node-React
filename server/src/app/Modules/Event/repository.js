import EventModel from "./model";
import { mCreateEventCategory } from "../EventCategory/repository";

const selectAll =
  "_id eventID title description category date isVirtual address createdAt updatedAt";

//#region Admin
export async function mCreateEvent(payload) {
  const newEvent = new EventModel(payload);
  newEvent.save();

  const category = payload.category;
  mCreateEventCategory(category);

  return newEvent;
}

export async function mGetEvents(
  page = 1,
  limit = 1000,
  columns = selectAll,
  conditions = {}
) {
  page = page ?? 1;
  limit = limit ?? 1000;
  columns = columns ?? selectAll;
  conditions = conditions ?? {};

  const offset = (page - 1) * limit;

  return EventModel.find(conditions)
    .skip(offset)
    .limit(limit)
    .select(columns)
    .exec();
}

export async function mUpdateEvent(conditions, payload) {
  const existingEvent = await EventModel.findOne(conditions);

  //check if event already expired
  const { date: existingDate } = existingEvent;
  if (new Date(existingDate).valueOf() < Date.now()) {
    throw new Error("You cannot update an expired event");
  }

  //check if the inputed data has expired
  if (new Date(payload.date).valueOf() < Date.now) {
    throw new Error("The event date has to reference the future");
  }

  await EventModel.updateOne(conditions, payload);

  return EventModel.findOne(conditions).select(selectAll).exec();
}

export async function mDeleteEvent(conditions) {
  return EventModel.findOneAndDelete(conditions).select(selectAll).exec();
}

export async function mSearchEvent(conditions) {
  const { title, categories, dateRange, isVirtual, address } = conditions;
  let newConditions = {};

  let categoriesCondition = [];
  if (categories) {
    categories.forEach((category, index) => {
      categoriesCondition[index] = { category: category };
    });

    newConditions["$or"] = categoriesCondition;
  }

  if (title) {
    newConditions["title"] = { $regex: ".*" + title + ".*" };
  }

  if (dateRange) {
    const { from, to } = dateRange;
    if (from) {
      newConditions["date"] ?? (newConditions["date"] = {});
      newConditions["date"]["$gte"] = from;
    }

    if (to) {
      newConditions["date"] ?? (newConditions["date"] = {});
      newConditions["date"]["$lte"] = to;
    }
  }

  if (isVirtual !== null) {
    newConditions["isVirtual"] = isVirtual;
  }

  if (address) {
    newConditions["address"] = { $regex: ".*" + address + ".*" };
  }

  return EventModel.find(newConditions).select(selectAll).exec();
}
//#endregion
