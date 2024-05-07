const user = require("../models/users");
const bcrypt = require("bcrypt");

require("dotenv").config();

const userRegisterController = async (req, res) => {
  const { uname, email, phoneNumber, gender, password, cpassword } = req.body;

  // validating phone number of the user
  if (phoneNumber.length < 10 || phoneNumber.length > 10) {
    return res.render("register", { error: "*Invalid Phone Number" });
  }

  try {
    // checking user already exist
    const userAlreadyExist =
      (await user.findOne({ email })) || (await user.findOne({ phoneNumber }));

    if (userAlreadyExist) {
      return res.render("register", {
        error: "*user with this email id or phone number already exist",
      });
    }

    // encrypting password of the user after validating it
    if (password.length < 6) {
      return res.render("register", {
        error: "*Password length should be greater than equal to 6",
      });
    }
    if (password !== cpassword) {
      return res.render("register", {
        error: "*Both password field contains different value",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );
    user.create({
      uname,
      email,
      phoneNumber,
      gender,
      password: hashedPassword,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log("Error in userRegistrationController");
    return;
  }
};

module.exports = userRegisterController;
