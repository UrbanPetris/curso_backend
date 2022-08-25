const { log } = require("../logger");

const serveFailureLogin = (req, res) => {
  res.render("pages/failureLogin");
  log.info(`${req.method} en ${req.originalUrl}`);
};

module.exports = {
  serveFailureLogin,
};
