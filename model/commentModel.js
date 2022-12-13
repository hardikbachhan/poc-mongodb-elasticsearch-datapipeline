const mongoose = require("mongoose");
const userModel = require("./userModel");
const postModel = require("./postModel");

// comment schema
const commentSchema = mongoose.Schema(
    {
        author: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

// pre hook to check if author and postId is valid
commentSchema.pre("save", async function (next) {
    try {
        const user = await userModel.findById(this.author);
        const post = await postModel.findById(this.postId);
        if (user && post) {
            next();
        } else {
            throw new Error("invalid user id or post id");
        }
    } catch (error) {
        console.log(error.messsage);
    }
});

// model creation
const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
