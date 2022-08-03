const destroySession = (req, res) => {
  try {
    req.session.destroy();
    res.status(200).render("pages/logout.ejs");
  } catch (error) {
    res.status(500).send("Err: ", err);
  }
};

module.exports = {
  destroySession,
};
