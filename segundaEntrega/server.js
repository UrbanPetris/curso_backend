const express = require("express");
const mongoose = require("mongoose");
const mongoCS =
  "mongodb+srv://Petris:coderhouse@cluster0.j2rcm.mongodb.net/?retryWrites=true&w=majority";

const app = express();
const PORT = process.env.PORT || 8080;
const productos = require("./src/routes/productos");
const carito = require("./src/routes/carrito");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/productos", productos);
app.use("/api/carrito", carito);
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/src/public/index.html");
});

app.use("/", (req, res) => {
  const route = req.url;
  const method = req.method;
  res.status(301).json({
    error: "-2",
    descripcion: `Ruta '${route}' método '${method}' no implementada`,
  });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await mongoose.connect(mongoCS);
});
