import { User } from "../models/user.model.js";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_ACCESS_KEY } from "../config.js";
const { sign } = jwt;

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      message: "Missing credentials",
    });

  const user = await User.findOne({
    email,
  });

  if (!user)
    return res.status(400).json({
      message: "Unknown user",
    });

  const isValidPass = compareSync(password, user.password);

  if (!isValidPass)
    return res.status(400).json({
      message: "Invalid password",
    });

  const token = sign({ userId: user.id }, JWT_ACCESS_KEY, {
    expiresIn: "1h",
  });

  res.json({
    token,
  });
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({
      message: "Missing credentials",
    });

  const existUser = await User.findOne({
    $or: [
      {
        username,
      },
      {
        email,
      },
    ],
  });

  if (existUser)
    return res.status(400).json({
      message: "Credentials taken",
    });

  const user = await User.create({
    username,
    email,
    password,
  });

  const token = sign({ userId: user.id }, JWT_ACCESS_KEY, {
    expiresIn: "1h",
  });

  res.json({
    token,
  });
};
