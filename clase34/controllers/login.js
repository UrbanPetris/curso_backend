const getLoginPage = (req, res) => {
  try {
    res.status(200).render("pages/login.ejs", { puerto: process.argv[2] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const makeLogin = (req, res) => {
  res.redirect("/");
};

module.exports = { getLoginPage, makeLogin };
