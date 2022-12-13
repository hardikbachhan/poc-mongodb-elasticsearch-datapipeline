const express = require("express");
const commentRouter = express.Router();
const { createNewComment } = require("../controller/commentController");
const { verifyUserByJWT } = require("../middlewares/verifyUserByJWT");

// ROUTE 9: - POST /api/comment/{id} add comment for post with {id} by the authenticated user.
//          - Input: Comment
//          - Return: Comment-ID
commentRouter
    .route("/:id")
    .post(verifyUserByJWT, createNewComment);


module.exports = commentRouter;