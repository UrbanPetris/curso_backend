const express = require("express");

const app = express();
const PORT = 8080;
const productos = require("./routes/productos");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/productos", productos);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
