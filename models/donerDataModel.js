const mongoose = require("mongoose");
const validBloodgroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const DonerDataModel = new mongoose.Schema(
  {
    createdbyUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
      unique: true,
    },
    isAlcoholic: {
      type: Boolean,
      default: false,
      require: true,
    },
    BloodGroup: {
      type: String,
      enum: validBloodgroups,
    },
    address: {
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
    lastDonationDate: {
      type: Date,
    },
    frequency: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const BloodDonarData = mongoose.model("DonerDataModel", DonerDataModel);

module.exports = BloodDonarData;
