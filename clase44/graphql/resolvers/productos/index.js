const {
  getProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  deleteProducts,
} = require("../../../controllers/productosAPI");

let resolvers = {
  getProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  deleteProducts,
};

module.exports = resolvers;
