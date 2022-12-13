const userModel = require("../model/userModel");

module.exports.followUserById = async function (req, res) {
    try {
        // retrieve loggedIn user and tobefollowed user id
        const loggedInUserId = req.loggedInUserId;
        const userToBeFollowedId = req.params.id;

        // add loggedin user to tobefolloweduser's followers list if not already present.
        const userToBeFollowed = await userModel.findById(userToBeFollowedId);
    
        if (!userToBeFollowed) {
            return res.status(404).json({ success: false, message: "invalid operation - user not found" });
        }
        if (!userToBeFollowed.followers.includes(loggedInUserId)) {
            userToBeFollowed.followers.push(loggedInUserId);
        } else {
            return res.status(400).json({ success: false, message: "user already been followed." });
        }
        userToBeFollowed.save();

        // add tobefolloweduser in loggedin user's following list
        const userLoggedIn = await userModel.findById(loggedInUserId);

        if (!userLoggedIn) {
            return res.status(404).json({ success: false, message: "invalid operation - user not found" });
        }
        if (!userLoggedIn.following.includes(userToBeFollowedId)) {
            userLoggedIn.following.push(userToBeFollowedId);
        } else {
            return res.status(400).json({ success: false, message: "user already been followed." });
        }
        userLoggedIn.save();

        // send success response
        res.json({ success: true, message: "user followed successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
