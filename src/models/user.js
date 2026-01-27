const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid", value);
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    gender: {
      type: String,
      validate(value) {
        if (value && !["male", "female", "other"].includes(value)) {
          throw new Error("Gender should be male, female or other");
        }
      },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "I am a developer",
    },
    skills: {
      type: [String],
      uniqueItems: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJwtToken = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );
  return isPasswordValid;
};
module.exports = mongoose.model("User", userSchema);
