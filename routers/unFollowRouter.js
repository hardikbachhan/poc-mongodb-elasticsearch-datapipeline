const express = require("express");
const unFollowRouter = express.Router();
const { unFollowUserById } = require("../controller/unFollowController");
const { verifyUserByJWT } = require("../middlewares/verifyUserByJWT");

// ROUTE 3: POST /api/unfollow/{id} authenticated user would unfollow a user with {id}
unFollowRouter
    .route("/:id")
    .post(verifyUserByJWT, unFollowUserById)




module.exports = unFollowRouter;