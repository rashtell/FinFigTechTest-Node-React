import EventCategoryModel from "./model";

const selectAll = "name createdAt updatedAt";

//#region Admin
export async function mCreateEventCategory(name) {
  const conditions = { name };
  if (await EventCategoryModel.exists(conditions)) {
    const eventCount =
      (
        await EventCategoryModel.findOne(conditions).select("eventCount").exec()
      )["eventCount"] + 1;

    return EventCategoryModel.updateOne(conditions, { eventCount });
  }

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
  await this.mDeleteEventCategory(name);
  return this.mCreateEventCategory(name);
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
