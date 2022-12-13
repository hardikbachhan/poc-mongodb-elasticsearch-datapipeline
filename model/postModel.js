const mongoose = require("mongoose");
const userModel = require("./userModel");

// post schema
const postSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        likes: {
            type: Array,
            default: [],
        },
        comments: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

// pre hook to check if userId is valid
postSchema.pre("save", async function (next) {
    try {
        const user = await userModel.findById(this.userId);
        if (user) {
            next();
        } else {
            throw new Error("invalid user id");
        }
    } catch (error) {
        console.log(error.messsage);
    }
});

// model creation
const postModel = mongoose.model("post", postSchema);

module.exports = postModel;
