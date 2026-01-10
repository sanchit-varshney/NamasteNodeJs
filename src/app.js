const express = require("express");
const connectdb = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignup } = require("./utils/validator");
const brcypt = require("bcrypt");

app.use(express.json());

connectdb()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
    try {
      app.post("/signup", async (req, res) => {
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
      });
    } catch (err) {
      res.status(500).send(err);
    }

    app.post("/login", async (req, res) => {
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
        res.status(200).send("Login successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    //find user with email
    app.get("/findUser", async (req, res) => {
      const userEmail = req.body.email;
      const Users = await User.find({ emailId: userEmail });
      if (Users.length < 0) {
        res.status(404).send("User not found");
      } else {
        res.status(200).send(Users);
      }
    });
    // find user wose age is greater than number

    app.get("/findByAge", async (req, res) => {
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
    app.patch("/updateUser", async (req, res) => {
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
        ALLOWED_UPDATES.includes(update)
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
  })
  .catch((err) => {
    console.log("Database not connected", err);
  });
