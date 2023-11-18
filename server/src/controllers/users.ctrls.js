import { Posts } from "../models/post.model.js"

export const getProfile = (req, res) => {
  const user = req.user;

  delete user.password;

  res.json(user);
}

export const getPosts = async (req, res) => {
  const author = req.user._id;

  const posts = await Posts.find({
    author
  });

  res.json(posts);
};