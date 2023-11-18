import { Router } from "express"
import { getPosts, getProfile } from "../controllers/users.ctrls.js";
import { isAuth } from "../middlewares/isAuth.js"
const users = Router()

// Get profile
users.get("/me", isAuth, getProfile);

// Get user posts
users.get("/me/posts", isAuth, getPosts);

export default users;