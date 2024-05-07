// imports
const express = require("express");
const connectDb = require("./config/db");
const path = require("path");
const staticRoutes = require("./routers/staticRouter");
const cookieParser = require("cookie-parser");

require("dotenv").config();

// creating express app
const app = express();

//calling connectDb method of db.js file
connectDb();

// declare middleware here
// using for declaring static file middleware
app.use(express.static("public"));
// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// for parsing cookie
app.use(cookieParser());

//set EJS as the view engine
app.set("view engine", "ejs");

// Set the path to the views directory
app.set("views", path.join(__dirname, "views"));

// setting routes
app.use("/", staticRoutes);

// this is used for making sever online
app.listen(process.env.PORT, () => {
  console.log("Server Is Online : " + "http://127.0.0.1:" + process.env.PORT);
});
