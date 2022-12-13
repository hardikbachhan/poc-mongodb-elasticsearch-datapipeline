const postModel = require("../model/postModel");
const commentModel = require("../model/commentModel");
var mongoose = require("mongoose");

module.exports.createNewPost = async function (req, res) {
    try {
        // retrieve loggedin user id from req obj.
        const loggedInUserId = req.loggedInUserId;

        // retrieve title and description from req body and create postObj
        const postObj = req.body;
        postObj["userId"] = loggedInUserId;

        // check if post already exists
        const post = await postModel.findOne({ title: postObj.title });
        if (post) {
            return res
                .status(409)
                .json({ success: false, message: "post already exists" });
        }

        // create new post
        const newPost = await postModel.create(postObj);
        postObj["postID"] = newPost["_id"].toString();
        postObj["createdTime"] = newPost["createdAt"];

        // send success response
        res.json({ success: true, postObj });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.deletePost = async function (req, res) {
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

        // check if loggedInId is same as the id that created the post.
        if (loggedInUserId !== post.userId) {
            return res.status(403).json({ success: false, message: "access denied" });
        }

        post.remove(postId);
        return res.json({ success: true, message: "post deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.getPost = async function (req, res) {
    try {
        // retrieve post id from params
        const postId = req.params.id;

        // check if post already exists
        const post = await postModel.findById(postId);
        if (!post) {
            return res
                .status(404)
                .json({ success: false, message: "post not found" });
        }

        // create post object to sent as response
        const postObj = {
            title: post.title,
            description: post.description,
            numLikes: post.likes.length,
            comments: post.comments.length,
        };

        // send success response
        res.json({ success: true, postObj });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports.getAllPosts = async function (req, res) {
    try {
        // retrieve loggedin user id from req obj.
        const loggedInUserId = mongoose.Types.ObjectId(req.loggedInUserId);
        
        // get all Posts made by user
        let allPosts = await postModel
            .find({ userId: loggedInUserId })
            .sort({ created_at: 1 });

        let commentsArr = [];

        allPosts = allPosts.map(postObj => {
            commentsArr.push(postObj.comments);
            return ({
                id: postObj["_id"],
                title: postObj.title,
                desc: postObj.description,
                created_at: postObj["createdAt"],
                comments: postObj.comments,
                likes: postObj.likes.length,
            });
        });

        for(let i = 0; i < commentsArr.length; i++) {
            for(let j = 0; j < commentsArr[i].length; j++) {
                const commentId = commentsArr[i][j];
                const comment = await commentModel.findById(mongoose.Types.ObjectId(commentId));
                commentsArr[i][j] = comment;
            }
        }

        for(let i = 0; i < commentsArr.length; i++) {
            commentsArr[i] = await Promise.all(commentsArr[i]);
            commentsArr[i] = commentsArr[i].map(commentObj => {
                return commentObj.comment;
            });
        }
        
        allPosts = allPosts.map((postObj, idx) => {
            postObj.comments = commentsArr[idx];
            return postObj;
        });
        
        // send success response
        res.json({ success: true, allPosts });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
