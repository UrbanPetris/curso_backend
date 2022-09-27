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
    await product.save();
    res.status(201).json(product);
  } catch (err) {}
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
      const productoActualizado = await Productos.updateOne(
        { _id: req.params.id },
        req.body
      );
      res.status(200).json(productoActualizado);
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
      deletedProduct = await Productos.deleteOne({ _id: req.params.id });
      res.status(200).json(deletedProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProducts = async (req, res) => {
  try {
    deletedProducts = await Productos.deleteMany({});
    res.status(200).json(deletedProducts);
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
  deleteProducts,
  findProduct,
};
