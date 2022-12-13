const userModel = require("../model/userModel");
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");

module.exports.authenticateUser = async function (req, res, next) {
    try {
        // query user from database to check if user exists
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) {
            res.status(404).json({ success: false, message: "login credentials incorrect" });
            return;
        }
        // compare password send in req to password saved in db
        let isPasswordMatching = await bcrypt.compare(password, user.password);
        if (!isPasswordMatching) {
            res.status(404).json({ success: false, message: "login credentials incorrect" });
            return;
        }
        // add user id of mongodb object to req object
        req.userId = user._id.toString();
        // call createJWT middleware
        next();
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
