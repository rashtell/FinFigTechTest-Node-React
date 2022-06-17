const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
import { Schema, model } from "mongoose";

let EventSchema = new Schema(
  {
    adminID: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
    title: {
      type: Schema.Types.String,
      required: [true, "Event title is required"],
    },
    description: {
      type: Schema.Types.String,
    },
    category: {
      type: Schema.Types.String,
      required: [true, "Event category is required"],
    },
    date: {
      type: Schema.Types.Date,
      required: [true, "Event date is required"],
    },
    isVirtual: {
      type: Schema.Types.Boolean,
      default: false,
    },
    address: {
      type: Schema.Types.String
    },
    eventID: {
      type: Schema.Types.Number,
    },
  },
  {
    timestamps: true,
  }
);

EventSchema.plugin(AutoIncrement, { inc_field: "eventID" });

module.exports = model("Events", EventSchema);
