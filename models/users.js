const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    uname: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
      unique: true,
    },
    role: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      require: true,
    },
    consentOfUser: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", usersSchema);
module.exports = User;
