import { mGetEventCategories } from "./repository";

export async function cGetEventCategories(req, res) {
  try {
    //get all event categories
    const events = await mGetEventCategories(null, null, null, {});

    return res.status(200).json({
      type: "success",
      msg: "",
      data: events,
      extra: null,
    });
  } catch (err) {
    return res.status(400).json({
      type: "error",
      msg: err.message,
      data: null,
      extra: null,
    });
  }
}
