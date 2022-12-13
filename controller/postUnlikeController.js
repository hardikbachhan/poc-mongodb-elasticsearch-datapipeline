const postModel = require("../model/postModel");

module.exports.unlikePost = async function (req, res) {
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
        console.log(post);
        if (!(post.likes.includes(loggedInUserId))) {
            return res
                .status(400)
                .json({ success: false, message: "cannot unlike a post which is not liked" });
        }

        // filter loggedin user id from likes array in post
        const newLikes = post.likes.filter(userId => userId !== loggedInUserId);
        post.likes = newLikes;
        post.save();

        // send success response
        res.json({ success: true, message: "post unliked successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};