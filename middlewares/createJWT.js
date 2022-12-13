const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports.createJWT = function (req, res) {
    try {
        // create payload obj
        const payload = { userId: req.userId };
        // sign jwt token
        const token = jwt.sign(payload, JWT_SECRET);
        // send token as response
        res.json({ success: true, message: "token created sucessfully", token });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
