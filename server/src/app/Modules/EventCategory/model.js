const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
import { Schema, model } from "mongoose";

let EventCategorySchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: [true, "Event category name is required"],
    },
    eventCount: {
      type: Schema.Types.Number,
      default: 1,
    },
    eventCategoryID: {
      type: Schema.Types.Number,
    },
  },
  {
    timestamps: true,
  }
);

EventCategorySchema.plugin(AutoIncrement, { inc_field: "eventCategoryID" });

const EventCategoryModel = model("EventCategories", EventCategorySchema);

module.exports = EventCategoryModel;
