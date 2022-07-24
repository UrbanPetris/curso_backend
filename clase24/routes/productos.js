const router = require("express").Router();
const { auth } = require("../middlewares/auth");

const { getProducts, addProduct } = require("../controllers/productos");

router.route("/").get(auth, getProducts).post(auth, addProduct);

module.exports = router;
