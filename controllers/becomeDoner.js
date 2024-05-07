const BloodDonarData = require("../models/donerDataModel");
const { changeUserConsent } = require("../utils/helperFunctins");

const donerController = async (req, res) => {
  const { pname, alcoholic, BloodGroup, Address, state, District, date } =
    req.body;
  try {
    BloodDonarData.create({
      createdbyUser: req.user._id,
      isAlcoholic: Boolean(alcoholic),
      BloodGroup: BloodGroup,
      address: Address,
      state: state,
      District: District,
      lastDonationDate: date == "" ? null : new Date(date),
    });
    // changing the value of user consent
    changeUserConsent(req.user._id);
    return res.redirect("logout");
  } catch (error) {
    console.log("error is donar controller " + error);
    return res.status(500).send("Server Error");
  }
};

module.exports = donerController;
