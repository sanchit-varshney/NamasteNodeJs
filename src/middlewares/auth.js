const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).send("Token not found. Please login.");
        }
        const decodedMessage = await jwt.verify(token, "DevTinder@123");
        const {_id} = decodedMessage;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(401).send("User not found");
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).send("Invalid or expired token");
    }
}
module.exports = { userAuth };