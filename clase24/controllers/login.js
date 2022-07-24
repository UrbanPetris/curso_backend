const getLoginPage = (req, res) => {
  try {
    res.status(200).render("pages/login.ejs");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const makeLogin = (req, res) => {
  const { name } = req.body;
  req.session.nombre = name;
  res.redirect("/");
};

module.exports = { getLoginPage, makeLogin };
