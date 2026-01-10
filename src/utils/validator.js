const validator = require("validator");
const validateSignup = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  try {
    if (!firstName || !lastName) {
      return new Error("First name and last name are required");
    }
     else if (!emailId) {
      return new Error("Email is required");
    } else if (!password) {
      return new Error("Password is required");
    }

  
  } catch (err) {
    return err;
  }
};

module.exports = { validateSignup };
