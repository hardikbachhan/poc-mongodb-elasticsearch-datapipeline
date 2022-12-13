// establishing connection to database
const connectToMongo = require("./db");
connectToMongo();

// initializing express app
const express = require("express");
const cors = require("cors");
const app = express();

// to read req.body in json
app.use(express.json());

// enable cors
app.use(cors());

// router for user authentication
const authRouter = require("./routers/authRouter");

// router to get user details
const userRouter = require("./routers/userRouter");

// router for user actions
const followRouter = require("./routers/followRouter");
const unFollowRouter = require("./routers/unFollowRouter");

// router for CRUD on posts
const postRouter = require("./routers/postRouter");
const allPostsRouter = require("./routers/allPostsRouter");

// router for liking a post
const postLikeRouter = require("./routers/postLikeRouter");

// router for unliking a post
const postUnlikeRouter = require("./routers/postUnlikeRouter");

// router for adding a comment to a post
const commentRouter = require("./routers/commentRouter");

// user authentication
app.use("/api/authenticate", authRouter);

// user actions
app.use("/api/follow", followRouter);
app.use("/api/unfollow", unFollowRouter);

// get user details
app.use("/api/user", userRouter);

// CRUD operations on post
app.use("/api/posts", postRouter);
app.use("/api/all_posts", allPostsRouter);

// post operations
app.use("/api/like", postLikeRouter);
app.use("/api/unlike", postUnlikeRouter);
app.use("/api/comment", commentRouter);

// use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3000;
// for testing purpose
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Social Media app listening on port ${port}!`);
    });
}

module.exports = app;
