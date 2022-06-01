const router = require("express").Router();
// let productos = [];

class Productos {
  constructor() {
    this.productos = [];
  }

  saveProducto(producto) {
    const id = this.productos.length + 1;
    this.productos.push({ ...producto, id });
    return id;
  }

  getAll() {
    try {
      return this.productos;
    } catch (err) {
      return { error: "Se ha producido un error" };
    }
  }

  getById(id) {
    try {
      const producto = this.productos.find((prod) => prod.id === id);
      if (producto) {
        return producto;
      } else {
        return { error: "producto no encontrado" };
      }
    } catch (err) {
      return { error: "Se ha producido un error" };
    }
  }

  updateById(productoActualizado) {
    try {
      const index = this.productos.findIndex(
        (prod) => prod.id == productoActualizado.id
      );
      this.productos.splice(index, 1, productoActualizado);
    } catch (err) {
      return { error: "Se ha producido un error" };
    }
  }

  deleteById(id) {
    try {
      this.productos.filter((prod) => prod.id !== id);
    } catch (err) {
      return { error: "Se ha producido un error" };
    }
  }
}

let productosContenedor = new Productos();

router
  .route("/")
  .get((req, res) => {
    res.json(productosContenedor.getAll());
  })
  .post((req, res) => {
    const id = productosContenedor.saveProducto(req.body);
    res.json(productosContenedor.getById(id));
  });

router
  .route("/:id")
  .get((req, res) => {
    res.json(productosContenedor.getById(parseInt(req.params.id)));
  })
  .put((req, res) => {
    productosContenedor.updateById(req.body);
    res.json({ mensaje: "Producto actualizado" });
  })
  .delete((req, res) => {
    productosContenedor.deleteById(parseInt(req.params.id));
    res.send("Se ha borrado un producto");
  });

module.exports = router;
