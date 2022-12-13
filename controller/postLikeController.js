const postModel = require("../model/postModel");

module.exports.likePost = async function (req, res) {
    try {
        // retrieve loggedin user id from req obj.
        const loggedInUserId = req.loggedInUserId;

        // retrieve post id from params
        const postId = req.params.id;

        // check if post exists
        const post = await postModel.findById(postId);
        if (!post) {
            return res
                .status(404)
                .json({ success: false, message: "post not found" });
        }

        // check if user exists in likes array in post
        if (post.likes.includes(loggedInUserId)) {
            return res
                .status(409)
                .json({ success: false, message: "post already liked" });
        }

        // add loggedin user id to likes array of post
        post.likes.push(loggedInUserId);
        post.save();

        // send success response
        res.json({ success: true, message: "post liked successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};