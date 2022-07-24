const express = require("express");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  session({
    secret: "estoesunaresecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

const productos = require("./routes/productos");
const logout = require("./routes/logout");
const login = require("./routes/login");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/productos", productos);
app.use("/logout", logout);
app.use("/login", login);
const { auth } = require("./middlewares/auth");

app.get("/", auth, (req, res) => {
  try {
    res.status(200).render("pages/index.ejs");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
