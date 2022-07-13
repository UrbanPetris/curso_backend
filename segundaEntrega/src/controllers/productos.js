const { Productos } = require("../models/productos");

const findProduct = async (id) => {
  return await Productos.findById(id);
};

const getProducts = async (req, res) => {
  let productos = await Productos.find({});
  try {
    res.status(200).json(productos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  const product = new Productos({
    ...req.body,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const producto = await findProduct(req.params.id);

    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProductById = async (req, res) => {
  try {
    const producto = await findProduct(req.params.id);
    if (producto) {
      await Productos.updateOne({ _id: req.params.id }, req.body);
      res.status(200).json({ message: "Producto actualizado" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const producto = await findProduct(req.params.id);
    if (producto) {
      await Productos.deleteOne({ _id: req.params.id });

      res.status(200).json({ message: "Producto eliminado" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  findProduct,
};
