const express = require("express");

const app = express();

const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", "./views");
app.set("view engine", "ejs");

let productos = [];

app.get("/", (req, res) => {
  try {
    res.status(200).render("pages/index.ejs");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/productos", (req, res) => {
  try {
    res.status(200).render("pages/productos.ejs", { productos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/productos", (req, res) => {
  try {
    productos.push({ ...req.body });
    res.status(201).render("pages/index.ejs");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
