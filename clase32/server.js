require("dotenv").config();
const yargs = require("yargs/yargs")(process.argv.slice(2));

const express = require("express");
const compression = require("compression");
const app = express();

const COMPRESSION = process.argv[4] === "COMPRESSION";
if (COMPRESSION) {
  app.use(compression());
}
const mongoose = require("mongoose");

const PORT = parseInt(process.argv[2]) || 8081;
const MODO = process.argv[3] || "FORK";
const numCpus = require("os").cpus().length;
const cluster = require("cluster");
const { log, logwarn, logerror } = require("./logger");

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

if (cluster.isMaster && MODO === "CLUSTER") {
  console.log("numCpus: ", numCpus);

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker: ${worker.id} died`);
    cluster.fork();
  });
} else {
  app.get("/", checkAuthentication, (req, res) => {
    try {
      res.status(200).render("pages/index.ejs");
      log.info(`${req.method} en ${req.originalUrl}`);
    } catch (err) {
      res.status(500).json({ message: err.message });
      log.error(`Error obteniendo página de inicio ${err}`);
      logerror.error(`Error obteniendo página de inicio ${err}`);
    }
  });

  app.get("*", function (req, res) {
    log.warn(`${req.method} en ${req.originalUrl}`);
    logwarn.warn(`${req.method} en ${req.originalUrl}`);
    res.status(404).send("Ruta no implementada");
  });

  app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT} - ProcessId: ${process.pid}`);
    await mongoose.connect(process.env.mongoCS);
  });
}
