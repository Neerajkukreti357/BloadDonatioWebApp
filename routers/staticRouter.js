const express = require("express");
const userLoginController = require("../controllers/userLogin");
const userRegisterController = require("../controllers/userRegistration");
const donerController = require("../controllers/becomeDoner");
const BloodRequestController = require("../controllers/bloodRequest");
const authenticationRequired = require("../middlewares/authenticationRequired");
const userLogoutController = require("../controllers/userLogout");
const { upload, pdfExcception } = require("../middlewares/fileHandling");
const router = express.Router();

router.get("/", (req, res) => {
  let isloggedIn = false;
  if (req.cookies?.uid) {
    isloggedIn = true;
  }
  return res.render("index", { isloggedIn });
});

router.get("/login", (req, res) => {
  return res.render("login", { error: false, isloggedIn: false });
});

router.post("/login", userLoginController);

router.post("/registration", userRegisterController);

router.get("/register", (req, res) => {
  return res.render("register", { error: false });
});

router.get("/main", authenticationRequired, (req, res) => {
  userInfo = req.user;
  return res.render("main", {
    consent: userInfo.consentOfUser,
    isloggedIn: true,
  });
});

router.post("/becomeDoner", authenticationRequired, donerController);

router.post(
  "/bloodRequest",
  authenticationRequired,
  upload.single("pdfFile"),
  pdfExcception,
  BloodRequestController
);

let userInfo = null;

router.get("/bloodRequestPage", authenticationRequired, (req, res) => {
  userInfo = req.user;
  return res.render("bloodRequestPage", {
    user_name: userInfo.uname,
    error: false,
  });
});

router.get("/becomeDonerPage", authenticationRequired, (req, res) => {
  userInfo = req.user;
  return res.render("becomeDonerPage", { userInfo });
});

router.get("/accepted", authenticationRequired, async (req, res) => {});

router.get("/logout", authenticationRequired, userLogoutController);

module.exports = router;
