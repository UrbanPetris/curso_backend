const router = require("express").Router();

const {
  getCarritos,
  addCarrito,
  deleteCarritoById,
  addProductToCartById,
  getProductsInCartById,
  deleteProductInCartById,
} = require("../controllers/carrito");

router.route("/").get(getCarritos).post(addCarrito);

router.route("/:id").delete(deleteCarritoById);

router
  .route("/:id/productos")
  .get(getProductsInCartById)
  .post(addProductToCartById);

router.route("/:id/productos/:id_prod").delete(deleteProductInCartById);

module.exports = router;
