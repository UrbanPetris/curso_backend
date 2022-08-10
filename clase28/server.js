require("dotenv").config();
const yargs = require("yargs/yargs")(process.argv.slice(2));

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = yargs.argv._[0] || 8080;

const session = require("express-session");
const passport = require("passport");
require("./middlewares/auth"); //lo necesita passport para inicializar

app.use(
  session({
    secret: "estoesunaresecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 600000,
    },
  })
);

const { checkAuthentication } = require("./middlewares/checkAuthentication");
const productos = require("./routes/productos");
const logout = require("./routes/logout");
const login = require("./routes/login");
const signup = require("./routes/signup");
const info = require("./routes/info");
const serveFailureLogin = require("./routes/serveFailure");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use("/productos", productos);
app.use("/logout", logout);
app.use("/login", login);
app.use("/signup", signup);
app.use("/info", info);
app.use("/serveFailure", serveFailureLogin);
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", checkAuthentication, (req, res) => {
  try {
    res.status(200).render("pages/index.ejs");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await mongoose.connect(process.env.mongoCS);
});
