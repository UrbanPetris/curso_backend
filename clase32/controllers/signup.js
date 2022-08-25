const { log } = require("../logger");

const getSignUpPage = (req, res) => {
  res.render("pages/indexSignup.ejs");
  log.info(`${req.method} en ${req.originalUrl}`);
};

const makeSignUp = (req, res) => {
  res.redirect("/");
};

module.exports = {
  getSignUpPage,
  makeSignUp,
};
