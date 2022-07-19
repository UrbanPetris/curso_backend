const express = require("express");

const app = express();
const PORT = process.env.PORT || 8080;

const productos = require("./routes/productos");
const productostest = require("./routes/productos-test");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/api/productos", productos);
app.use("/api/productos-test", productostest);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
