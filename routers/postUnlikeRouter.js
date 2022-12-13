const express = require("express");
const postUnlikeRouter = express.Router();
const { unlikePost } = require("../controller/postUnlikeController");
const { verifyUserByJWT } = require("../middlewares/verifyUserByJWT");

// ROUTE 8: POST /api/unlike/{id} would unlike the post with {id} by the authenticated user.
postUnlikeRouter
    .route("/:id")
    .post(verifyUserByJWT, unlikePost);




module.exports = postUnlikeRouter;