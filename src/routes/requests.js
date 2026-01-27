const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user");

requestRouter.post("/send-request", async (req, res) => {
    try {
        const { userId, senderId } = req.body;
        const user = await User.findById(userId);
        const sender = await User.findById(senderId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        if (!sender) {
            return res.status(404).send("Sender not found");
        }
        user.requests.push(senderId);
        await user.save();
        res.status(200).send("Request sent successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

  //find user with email
    requestRouter.get("/findUser", async (req, res) => {
      const userEmail = req.body.email;
      const Users = await User.find({ emailId: userEmail });
      if (Users.length < 0) {
        res.status(404).send("User not found");
      } else {
        res.status(200).send(Users);
      }
    });
    // find user wose age is greater than number

    requestRouter.get("/findByAge", async (req, res) => {
      const age = req.body.age;
      const Users = await User.find({ age: { $gt: age } });
      console.log(Users);
      if (Users.length < 0) {
        res.status(404).send("User not found");
      } else {
        res.status(200).send(Users);
      }
    });

    //update user
    requestRouter.patch("/updateUser", async (req, res) => {
      const userId = req.body.userId;
      const data = req.body;

      const ALLOWED_UPDATES = [
        "userId",
        "age",
        "gender",
        "photoUrl",
        "about",
        "skills",
      ];
      const isUpdateAllowed = Object.keys(data).every((update) =>
        ALLOWED_UPDATES.includes(update),
      );
      if (!isUpdateAllowed) {
        return res.status(400).send({ error: "Invalid update", error });
      }
      try {
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
          returnDocument: "after",
          runValidators: true,
        });
        console.log(user);
        res.send("User Updated Successfully");
      } catch (err) {
        res.status(500).send(err);
      }
    });

module.exports = requestRouter;