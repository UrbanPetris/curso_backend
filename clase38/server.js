require("dotenv").config();

const { sessionSettings, server, db, admin } = require("./lib/config");
const path = require("path");
global.appRoot = path.resolve(__dirname);
global.adminPhoneNumber = admin.phoneNumber;

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const PORT = server.port;
const session = require("express-session");
const { log, logwarn, logerror } = require("./lib/logger");
const passport = require("passport");
require("./middlewares/auth"); //lo necesita passport para inicializar

app.use(session(sessionSettings));

const { checkAuthentication } = require("./middlewares/checkAuthentication");
const { Productos } = require("./models/productos");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/index")(app); //routing
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", checkAuthentication, async (req, res) => {
  let productos = await Productos.find({});
  try {
    res.status(200).render("pages/indexProducts.ejs", {
      data: {
        productos: productos,
        id: req.user._id,
        firstname: req.user.firstname,
        avatar: req.user.avatar,
      },
    });
    log.info(`${req.method} en ${req.originalUrl}`);
  } catch (err) {
    res.status(500).json({ message: err.message });
    log.error(`Error obteniendo página de inicio ${err}`);
    logerror.error(`Error obteniendo página de inicio ${err}`);
  }
});

app.get("*", (req, res) => {
  log.warn(`${req.method} en ${req.originalUrl}`);
  logwarn.warn(`${req.method} en ${req.originalUrl}`);
  res.status(404).send("Ruta no implementada");
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT} - ProcessId: ${process.pid}`);
  await mongoose.connect(db.url_mongo);
});
