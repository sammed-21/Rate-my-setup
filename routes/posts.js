const express = require("express")
const Post = require('../models/post')
const security = require('../middleware/security')
const router = express.Router()
const permissions = require('../middleware/permissions')
router.post("/",security.requireAuthenticatedUser, async (req, res, next) => {
  try {
// create a new post
const {user} = res.locals
const post = await Post.createNewPost({user,post:req.body})
return res.status(201).json({post})

} catch (err) {
    next(err)
  }
})

router.get("/", async (req, res, next) => {
  try {
// create a new post
const posts = await Post.listPosts()
return res.status(200).json({posts})
} catch (err) {
    next(err)
  }
})

router.get("/:postId", async (req, res, next) => {
  try {
// create a new post
const {postId} = req.params;
const post = await Post.fetchPostById(postId);
return res.status(200).json({post})

} catch (err) {
    next(err)
  }
})

router.patch("/:postId",security.requireAuthenticatedUser, permissions.authedUserOwnsPost, async (req, res, next) => {
  try {
// create a new post
const {postId} =req.params
const post = await Post.editPost({postUpdate:req.body, postId})
return res.status(200).json({post})
} catch (err) {
    next(err)
  }
})

router.post("/:postId/rating", async (req, res, next) => {
  try {
// create a new post

} catch (err) {
    next(err)
  }
})

 
module.exports = router
