const mongoose = require("mongoose");

const validBloodgroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const BloodRequestModel = new mongoose.Schema(
  {
    requestby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    patientName: {
      type: String,
      require: true,
    },
    disease: {
      type: String,
      require: true,
    },
    medicalReportPdfPath: {
      type: String,
      require: true,
    },
    BloodGroup: {
      type: String,
      enum: validBloodgroups,
    },
    Address: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      default: "",
    },
    District: {
      type: String,
      default: "",
    },
    hospitalName: {
      type: String,
      require: true,
    },
    requestAccepted: {
      type: Boolean,
      default: false,
    },
    requestSuccessfull: {
      type: Boolean,
      default: false,
    },
    requestSendAlready: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Define model
const BloodRequestData = mongoose.model("BloodRequestData", BloodRequestModel);
module.exports = BloodRequestData;
