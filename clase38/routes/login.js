const router = require("express").Router();
const { authenticate } = require("../middlewares/auth");

const { getLoginPage, makeLogin } = require("../controllers/login");

router.route("/").get(getLoginPage).post(authenticate("login"), makeLogin);

module.exports = router;
