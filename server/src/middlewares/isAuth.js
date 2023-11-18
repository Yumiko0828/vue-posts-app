import jwt from "jsonwebtoken";
import { JWT_ACCESS_KEY } from "../config.js";
import { User } from "../models/user.model.js";
const { verify } = jwt;

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
*/
export const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !/[Bb]earer /g.test(token.slice(0, 7)))
    return res.status(401).json({
      message: "Invalid jwt",
    });

  verify(token.slice(7), JWT_ACCESS_KEY, async (e, decoded) => {
    if (e)
      return res.status(401).json({
        message: "Unauthorized",
      });

    const user = await User.findById(decoded.userId, {
      password: 0
    });

    req.user = user.toJSON();

    next();
  });
};
