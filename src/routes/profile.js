const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    // Convert mongoose document to plain object and exclude password
    const userObject = user.toObject();
    delete userObject.password;
    res.status(200).json(userObject);
  } catch (err) {
    return res.status(401).send("Invalid or expired token");
  }
});

profileRouter.patch("/profile/edit", userAuth, (req, res) => {
  try {
    const user = req.user;
    // Convert mongoose document to plain object and exclude password
    const userObject = user.toObject();
    delete userObject.password;
    return res.status(200).send("Profile updated successfully");
  } catch (err) {
    return res.status(401).send("Invalid or expired token");
  }
});

module.exports = profileRouter;
