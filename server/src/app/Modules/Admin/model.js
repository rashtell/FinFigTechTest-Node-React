const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
import { model, Schema } from "mongoose";
import { errorDuplicate } from "../../Domain/MongooseHelper";

let AdminSchema = new Schema(
  {
    username: {
      type: Schema.Types.String,
      required: [true, "Username is required"],
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: [true, "Password is required"],
    },
    name: {
      type: Schema.Types.String,
      required: [true, "Name is required"],
    },
    email: {
      type: Schema.Types.String,
      required: [true, "Email is required"],
      unique: true,
    },
    publicKey: {
      type: Schema.Types.String,
    },
    deleted: {
      type: Schema.Types.Boolean,
      default: false,
    },
    adminID: {
      type: Schema.Types.Number,
    },
  },
  {
    timestamps: true,
  }
);

AdminSchema.post("save", errorDuplicate);

AdminSchema.plugin(AutoIncrement, { inc_field: "adminID" });

module.exports = model("Admin", AdminSchema);
