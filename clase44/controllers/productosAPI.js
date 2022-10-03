const { Productos } = require("../models/productos");

const findProduct = async (id) => {
  return await Productos.findById(id);
};

const getProducts = async () => {
  let productos = await Productos.find({});
  try {
    return productos;
  } catch (err) {
    return { message: err.message };
  }
};

const addProduct = async (args) => {
  const product = new Productos({
    ...args.data,
  });

  try {
    await product.save();
    return product;
  } catch (err) {
    return { message: err.message };
  }
};

const getProductById = async (args) => {
  try {
    const producto = await findProduct(args.id);

    if (producto) {
      return producto;
    } else {
      return { error: "Producto no encontrado" };
    }
  } catch (err) {
    return { message: err.message };
  }
};

const updateProductById = async (args) => {
  try {
    const producto = await findProduct(args.id);
    if (producto) {
      await Productos.updateOne({ _id: args.id }, args.data);
      return await findProduct(args.id);
    } else {
      return { error: "Producto no encontrado" };
    }
  } catch (err) {
    return { message: err.message };
  }
};

const deleteProductById = async (args) => {
  try {
    const producto = await findProduct(args.id);
    if (producto) {
      await Productos.deleteOne({ _id: args.id });
      return producto;
    } else {
      return { error: "Producto no encontrado" };
    }
  } catch (err) {
    return { message: err.message };
  }
};

const deleteProducts = async () => {
  try {
    let productos = await Productos.find({});
    await Productos.deleteMany({});
    return productos;
  } catch (err) {
    return { message: err.message };
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
