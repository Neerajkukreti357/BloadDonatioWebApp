const { delUser } = require("../utils/auth");

const userLogoutController = (req, res) => {
  delUser(req.cookies.uid);
  res.clearCookie("uid");
  return res.redirect("/");
};

module.exports = userLogoutController;
