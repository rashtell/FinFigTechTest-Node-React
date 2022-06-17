import EventCategoryModel from "./model";

const selectAll = "name createdAt updatedAt";

//#region Admin
export async function mCreateEventCategory(name) {
  if (EventCategoryModel.exists({ name })) {
    return null;
  }

  const newEventCategory = new EventCategoryModel({ name });
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
//#endregion
