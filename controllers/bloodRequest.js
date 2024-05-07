const BloodRequestData = require("../models/BloodRequestModel");
const BloodDonarData = require("../models/donerDataModel");
const { sendMail } = require("../utils/sendMail");
const { getPhonenumber } = require("../utils/helperFunctins");

const BloodRequestController = async (req, res) => {
  const userId = req.user._id;

  const pdfFilePath = req.file?.path;
  const { pname, BloodGroup, disease, Address, state, District, hospitalName } =
    req.body;
  try {
    BloodRequestData.create({
      requestby: userId,
      pname,
      disease,
      medicalReportPdfPath: pdfFilePath,
      pdfFilePath,
      BloodGroup,
      Address,
      state,
      District,
      hospitalName,
    });

    const Bload_donar_list = await BloodDonarData.find({
      BloodGroup,
      state,
      District,
    });

    if (Bload_donar_list.length === 0) {
      return res
        .status(400)
        .json({ msg: "No User Found With this bload group yet" });
    }

    const id_list = [];
    const filter_donar_list = [];
    Bload_donar_list.forEach((item) => {
      if (item.createdbyUser.toString() !== req.user._id.toString()) {
        id_list.push(item.createdbyUser);
        filter_donar_list.push(item);
      }
    });
    let phonenumber = await getPhonenumber(userId);
    await sendMail(
      id_list,
      BloodGroup,
      pname,
      Address + " " + state + " " + District,
      disease,
      hospitalName,
      phonenumber,
      pname,
      pdfFilePath,
      req.file.filename
    );

    return res.render("lobby", {
      list_of_user: filter_donar_list,
      isloggedIn: true,
    });
  } catch (error) {
    console.log("Error in BloodRequest : " + error);
    return;
  }
};

module.exports = BloodRequestController;
