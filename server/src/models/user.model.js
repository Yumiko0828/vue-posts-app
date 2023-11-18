import { genSaltSync, hashSync } from "bcrypt";
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
  },
);

userSchema.pre("save", function () {
  const salt = genSaltSync(10);
  this.password = hashSync(this.password, salt);
});

export const User = model("users", userSchema);
