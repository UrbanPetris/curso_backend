const getSignUpPage = (req, res) => {
  res.render("pages/indexSignup.ejs");
};

const makeSignUp = (req, res) => {
  res.redirect("/");
};

module.exports = {
  getSignUpPage,
  makeSignUp,
};
