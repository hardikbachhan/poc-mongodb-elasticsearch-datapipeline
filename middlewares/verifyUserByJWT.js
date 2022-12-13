const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.verifyUserByJWT = function (req, res, next) {
    try {
        // check if authorization header is set
        if (req.headers.authorization) {
            // verify JWT token received in req header
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, JWT_SECRET, function(error, decoded) {
                if (error) {
                    return res.json({ success: false, message: "user not registered" });
                }
                req.loggedInUserId = decoded.userId;
                next();
            });
        } else {
            res.status(403).json({ success: false, message: "invalid operation" });
            return;
        }
    } catch (error) {
        console.log("JWT error: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
