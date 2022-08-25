const router = require("express").Router();
const { checkAuthentication } = require("../middlewares/checkAuthentication");

const { getProducts, addProduct } = require("../controllers/productos");

router
  .route("/")
  .get(checkAuthentication, getProducts)
  .post(checkAuthentication, addProduct);

module.exports = router;
