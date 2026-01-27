const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");


profileRouter.get("/view", async (req, res) => {
    try {
        const user = req.user;
        res.status(200).send(user);
    } catch (err) {
        return res.status(401).send("Invalid or expired token");
    }
});

profileRouter.get("/profile", userAuth, (req, res) => {
      try {
        const user = req.user;
        res.status(200).send(user);
      } catch (err) {
        return res.status(401).send("Invalid or expired token");
      }
    });

    module.exports = profileRouter