const postModel = require("../model/postModel");
const commentModel = require("../model/commentModel");

module.exports.createNewComment = async function (req, res) {
    try {
        // retrieve loggedin user id from req obj.
        const loggedInUserId = req.loggedInUserId;

        // retrieve postId from params
        const postId = req.params.id;

        // retrieve comment from req.body
        const commentData = req.body.comment;

        // query post from mongodb
        const post = await postModel.findById(postId);

        // check if post exists
        if (!post) {
            return res
                .status(404)
                .json({ success: false, message: "post not found" });
        }

        // create comment document
        const commentDetails = {
            author: loggedInUserId,
            postId,
            comment: commentData,
        };
        const comment = await commentModel.create(commentDetails);

        // add comment to post.comments array
        const commentId = comment["_id"].toString();
        post.comments.push(commentId);
        post.save();

        // send success response
        res.json({ success: true, message: "commented recorded successfully", commentId });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};