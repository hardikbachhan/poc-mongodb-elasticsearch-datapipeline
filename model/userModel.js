const mongoose = require("mongoose");
const emailValidator = require("email-validator");

// user schema
const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            validate: function () {
                return emailValidator.validate(this.email);
            },
        },
        password: {
            type: String,
            required: true,
        },
        followers: {
            type: Array,
            default: [],
        },
        following: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

// model creation
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
