const router = require("express").Router();
const {
  getProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productos");

router.route("/").get(getProducts).post(addProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById);

module.exports = router;
