import EventCategoryModel from "./model";

const selectAll = "name createdAt updatedAt";

//#region Admin
export async function mCreateEventCategory(name) {
  const conditions = { name };
  //check if category exissts
  if (await EventCategoryModel.exists(conditions)) {
    //increase the number of event using this catgory
    const eventCount =
      (
        await EventCategoryModel.findOne(conditions).select("eventCount").exec()
      )["eventCount"] + 1;

    return EventCategoryModel.updateOne(conditions, { eventCount });
  }

  //else create a new category
  const newEventCategory = new EventCategoryModel(conditions);
  return newEventCategory.save();
}

export async function mGetEventCategories(
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

  return EventCategoryModel.find(conditions)
    .skip(offset)
    .limit(limit)
    .select(columns)
    .exec();
}

export async function mUpdateEventCategory(name) {
  //use delete procedure and create procedure to handle cateogry update
  await mDeleteEventCategory(name);
  return mCreateEventCategory(name);
}

export async function mDeleteEventCategory(name) {
  const conditions = { name };

  if (!(await EventCategoryModel.exists(conditions))) {
    return;
  }

  const eventCategory = await EventCategoryModel.findOne(conditions).exec();
  const eventCount = eventCategory.eventCount - 1;
  if (eventCount < 1) {
    return EventCategoryModel.deleteOne(conditions);
  }

  return EventCategoryModel.updateOne(conditions, { eventCount });
}
//#endregion
