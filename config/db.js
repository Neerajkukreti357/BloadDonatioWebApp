const mongoose = require("mongoose");

// config env variables
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Database connected Successfully");
  } catch (err) {
    console.log("Error Durining Data Base Connectivity" + err);
  }
};

module.exports = connectDb;
