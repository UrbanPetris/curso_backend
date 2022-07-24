const router = require("express").Router();

const { getLoginPage, makeLogin } = require("../controllers/login");

router.route("/").get(getLoginPage).post(makeLogin);

module.exports = router;
