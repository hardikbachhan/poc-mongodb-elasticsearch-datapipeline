const express = require("express");
const postLikeRouter = express.Router();
const { likePost } = require("../controller/postLikeController");
const { verifyUserByJWT } = require("../middlewares/verifyUserByJWT");

// ROUTE 7: POST /api/like/{id} would like the post with {id} by the authenticated user.
postLikeRouter
    .route("/:id")
    .post(verifyUserByJWT, likePost);




module.exports = postLikeRouter;