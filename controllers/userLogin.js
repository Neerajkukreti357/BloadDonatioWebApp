const user = require("../models/users");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../utils/auth");

const userLoginController = async (req, res) => {
  const { email, password } = req.body;

  // checking user exist or not
  try {
    const UserData = await user.findOne({ email });

    if (!UserData) {
      return res.render("login", { error: "*User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, UserData.password);
    if (!isPasswordCorrect) {
      return res.render("login", { error: "*Password is Incorrect" });
    }

    //for generating unique id for session creation
    const sessionId = uuidv4();
    // this is the utils function which i have made for storing user cookie on the server
    setUser(sessionId, UserData);
    // this is used for set the cookie
    res.cookie("uid", sessionId, { maxAge: 360000 });
    return res.render("main", {
      consent: UserData.consentOfUser,
      isloggedIn: true,
    });
  } catch (error) {
    console.log("error in logincontroller" + error);
  }
};

module.exports = userLoginController;
