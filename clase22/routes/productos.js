const router = require("express").Router();
let productos = [];

const addProduct = (productDetails) => {
  const id = productos.length + 1;
  const nuevoProducto = { ...productDetails, id };
  productos.push(nuevoProducto);
  return nuevoProducto;
};

const getProductById = (id) => {
  return productos.find((prod) => prod.id === parseInt(id));
};

const updateProductById = (productDetails, id) => {
  productos[productos.findIndex((prod) => prod.id === id)] = {
    ...productDetails,
    id: id,
  };
};

const deleteProductById = (id) => {
  productos = productos.filter((prod) => prod.id !== parseInt(id));
};

router
  .route("/")
  .get((req, res) => {
    try {
      res.status(200).json(productos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .post((req, res) => {
    try {
      const nuevoProducto = addProduct(req.body);
      res.status(201).json(nuevoProducto);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router
  .route("/:id")
  .get((req, res) => {
    try {
      const producto = getProductById(req.params.id);
      if (producto) {
        res.status(200).json(producto);
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .put((req, res) => {
    try {
      const producto = getProductById(req.params.id);
      if (producto) {
        updateProductById(req.body, producto.id);
        res.status(200).json({ message: "Producto actualizado" });
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .delete((req, res) => {
    try {
      const producto = getProductById(req.params.id);
      if (producto) {
        deleteProductById(producto.id);
        res.status(200).json({ message: "Producto eliminado" });
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
