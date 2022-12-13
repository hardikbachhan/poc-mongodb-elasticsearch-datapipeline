const userModel = require("../model/userModel");

module.exports.unFollowUserById = async function (req, res) {
    try {
        // retrieve loggedIn user and tobefollowed user id
        const loggedInUserId = req.loggedInUserId;
        const userToBeFollowedId = req.params.id;

        // remove loggedin user from tobefolloweduser's followers list if present.
        const userToBeFollowed = await userModel.findById(userToBeFollowedId);
    
        if (!userToBeFollowed) {
            return res.status(404).json({ success: false, message: "invalid operation - user not found" });
        }
        if (userToBeFollowed.followers.includes(loggedInUserId)) {
            userToBeFollowed.followers = userToBeFollowed.followers.filter(userId => userId !== loggedInUserId);
        } else {
            return res.status(400).json({ success: false, message: "first follow user to unfollow" });
        }
        userToBeFollowed.save();

        // remove tobefolloweduser in loggedin user's following list
        const userLoggedIn = await userModel.findById(loggedInUserId);

        if (!userLoggedIn) {
            return res.status(404).json({ success: false, message: "invalid operation - user not found" });
        }
        if (userLoggedIn.following.includes(userToBeFollowedId)) {
            userLoggedIn.following = userLoggedIn.following.filter(userId => userId !== userToBeFollowedId);
        } else {
            return res.status(400).json({ success: false, message: "first follow user to unfollow" });
        }
        userLoggedIn.save();

        // send success response
        res.json({ success: true, message: "user unfollowed successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
