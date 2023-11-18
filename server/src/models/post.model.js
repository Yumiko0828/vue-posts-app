import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Posts = model("posts", postSchema);
