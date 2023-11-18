import { Posts } from "../models/post.model.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const getAllPost = async (req, res) => {
  const posts = await Posts.find().populate("author", {
    password: 0
  });

  res.json(posts);
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await Posts.findById(id).populate("author", {
    password: 0
  });

  if (!post)
    return res.status(404).json({
      message: "Post not found",
    });

  res.json(post);
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const createPost = async (req, res) => {
  const { content } = req.body;

  if (!content)
    return res.status(400).json({
      message: "Missing content",
    });

  const post = await Posts.create({
    content,
    author: req.user._id,
  });

  res.json((await post.populate("author", {
    password: 0
  })).toJSON());
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content)
    return res.status(400).json({
      message: "Missing content",
    });

  const updatedPost = await Posts.findByIdAndUpdate(id, {
    content,
  });

  res.status(201).json(updatedPost);
};

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const deletePost = async (req, res) => {
  const { id } = req.params;

  const deletedPost = await Posts.findByIdAndDelete(id);

  res.json(deletedPost);
};
