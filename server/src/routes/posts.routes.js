import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  updatePost,
} from "../controllers/posts.ctrls.js";
import { isAuth } from "../middlewares/isAuth.js";
const posts = Router();

// Get all posts
posts.get("/", isAuth, getAllPost);

// Get post by id
posts.get("/:id", isAuth, getPostById);

// Create a post
posts.post("/", isAuth, createPost);

// Update a post
posts.put("/:id", isAuth, updatePost);

// Delete a post
posts.delete("/:id", isAuth, deletePost);

export default posts;
