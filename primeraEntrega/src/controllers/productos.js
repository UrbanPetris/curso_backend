const fs = require("fs");

let productos = [];

const findProduct = (id) => {
  return productos.find((prod) => prod.id === parseInt(id));
};

const guardarProductos = async (object) => {
  await fs.promises.writeFile(
    "./utils/productos.txt",
    JSON.stringify(object, null, 2),
    {
      encoding: "utf8",
      flag: "w",
    }
  );
};

const getProducts = (req, res) => {
  try {
    res.status(200).json(productos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProduct = (req, res) => {
  try {
    const id = productos.length + 1;
    const timestamp = Date.now();
    const nuevoProducto = { id, timestamp, ...req.body };
    productos.push(nuevoProducto);
    try {
      guardarProductos(productos);
    } catch {
      res.status(500).json({ message: err.message });
    }
    res.status(201).json(nuevoProducto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = (req, res) => {
  try {
    const producto = findProduct(req.params.id);

    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProductById = (req, res) => {
  try {
    const producto = findProduct(req.params.id);
    if (producto) {
      productos[productos.findIndex((prod) => prod.id === producto.id)] = {
        timestamp: producto.timestamp,
        id: producto.id,
        ...req.body,
      };
      try {
        guardarProductos(productos);
      } catch {
        res.status(500).json({ message: err.message });
      }
      res.status(200).json({ message: "Producto actualizado" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProductById = (req, res) => {
  try {
    const producto = findProduct(req.params.id);
    if (producto) {
      productos = productos.filter((prod) => prod.id !== parseInt(producto.id));
      try {
        guardarProductos(productos);
      } catch {
        res.status(500).json({ message: err.message });
      }
      res.status(200).json({ message: "Producto eliminado" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  findProduct,
  getProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  productos,
};
