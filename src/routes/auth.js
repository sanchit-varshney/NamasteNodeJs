const express = require("express");
const authRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { validateSignup } = require("../utils/validator");
const brcypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");


authRouter.post("/signup", async (req, res) => {
  try {
    validateSignup(req);
    const { password } = req.body;

  const passwordHash = await brcypt.hash(password, 10);
  const user = new User({
    ...req.body,
    password: passwordHash,
  });
    user
      .save()
      .then((user) => {
        res.status(201).send("User created");
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Test route to verify server is working
authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { httpOnly: true, expires: new Date(0) });
  res.status(200).send("Logged out successfully");
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isMatch = await brcypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }
    const token = jwt.sign({ _id: user._id }, "DevTinder@123");
    res.cookie("token", token, { httpOnly: true });
    res.status(200).send("Login successful");
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = authRouter;
