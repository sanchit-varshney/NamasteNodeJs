const express = require("express");
const connectdb = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

// Middleware - must be before routes
app.use(cookieParser());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.status(200).send("Server is running! Use POST /signup to create an account.");
});

// Routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const connectionRouter = require("./routes/connections");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", connectionRouter);

connectdb()
  .then(() => {
    console.log("Database connected");
    app.listen(3007, () => {
      console.log("Server is running on port 3007");
    });
  })
  .catch((err) => {
    console.log(err);
  }); 
