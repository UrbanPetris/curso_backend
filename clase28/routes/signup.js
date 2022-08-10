const router = require("express").Router();
const passport = require("passport");

const { getSignUpPage, makeSignUp } = require("../controllers/signup");

router
  .route("/")
  .get(getSignUpPage)
  .post(
    passport.authenticate("register", { failureRedirect: "/serveFailure" }),
    makeSignUp
  );

module.exports = router;
