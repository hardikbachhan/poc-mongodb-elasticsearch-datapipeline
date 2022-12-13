const express = require("express");
const followRouter = express.Router();
const { followUserById } = require("../controller/followController");
const { verifyUserByJWT } = require("../middlewares/verifyUserByJWT");

// ROUTE 2: POST /api/follow/{id} authenticated user would follow user with {id}
followRouter
    .route("/:id")
    .post(verifyUserByJWT, followUserById)




module.exports = followRouter;