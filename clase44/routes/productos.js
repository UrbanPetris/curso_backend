const router = require("express").Router();
const {
  getProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  deleteProducts,
} = require("../controllers/productosAPI");
const { checkAuthentication } = require("../middlewares/checkAuthentication");

router
  .route("/")
  .get(
    // checkAuthentication,
    getProducts
  )
  .post(
    // checkAuthentication,
    addProduct
  )
  .delete(
    // checkAuthentication,
    deleteProducts
  );

router
  .route("/:id")
  .get(
    // checkAuthentication,
    getProductById
  )
  .put(
    // checkAuthentication,
    updateProductById
  )
  .delete(
    // checkAuthentication,
    deleteProductById
  );

module.exports = router;
