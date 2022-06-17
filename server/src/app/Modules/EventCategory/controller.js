import { mGetEventCategories } from "./repository";

export async function cGetEventCategories(req, res) {
  try {
    //create event
    const events = await mGetEventCategories(null, null, null, {});

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
