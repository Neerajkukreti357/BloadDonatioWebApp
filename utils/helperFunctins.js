const User = require("../models/users");
const BloodRequestData = require("../models/BloodRequestModel");

const changeUserConsent = async (uid) => {
  const user_data = await User.findById({ _id: uid });

  if (!user_data) {
    return res.status(404).json({ message: "User Not Found 404" });
  }
  user_data.consentOfUser = true;
  await user_data.save();
};

const getPhonenumber = async (uid) => {
  let user = await User.findById({ _id: uid });
  return user.phoneNumber;
};
module.exports = { changeUserConsent, getPhonenumber };
