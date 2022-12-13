const express = require("express");
const allPostsRouter = express.Router();
const { getAllPosts } = require("../controller/postController");
const { verifyUserByJWT } = require("../middlewares/verifyUserByJWT");

// ROUTE 11: - - GET /api/all_posts would return all posts created by authenticated user sorted by post time.
//             - RETURN: For each post return the following values
//             - id: ID of the post
//             - title: Title of the post
//             - desc: Description of the post
//             - created_at: Date and time when the post was created
//             - comments: Array of comments, for the particular post
//             - likes: Number of likes for the particular post
allPostsRouter
    .route("/")
    .get(verifyUserByJWT, getAllPosts)


module.exports = allPostsRouter;