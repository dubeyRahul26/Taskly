import mongoose from "mongoose";
import { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedOn: {
      type: Date,
      default: null,
    },
    createdBy: {
      ref: "User",
      type: Schema.ObjectId,
      required: true, // Ensure it is always included
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
