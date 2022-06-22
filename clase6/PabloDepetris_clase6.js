const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
    try {
      console.log("-----Devolviendo todos los productos-----");
      return JSON.parse(await fs.promises.readFile(this.archivo, "utf-8"));
    } catch (err) {
      console.log("Ha habido un error", err);
    }
  }
}

const productos = new Contenedor("Productos.txt");

const express = require("express");

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en servidor ${error}`));

app.get("/productos", async (req, res) => {
  const arrayProductos = await productos.getAll();
  res.send(arrayProductos);
});

app.get("/productoRandom", async (req, res) => {
  const arrayProductos = await productos.getAll();
  const randomProduct =
    arrayProductos[Math.floor(Math.random() * arrayProductos.length)];
  res.send(randomProduct);
});
