const router = require("express").Router();
const { faker } = require("@faker-js/faker");

faker.locale = "es";

router.route("/").get((req, res) => {
  let productos = [];

  for (let index = 0; index < 5; index++) {
    const randomProduct = {
      nombre: faker.commerce.productName(),
      precio: faker.commerce.price(100, 200, 0, "$"),
      foto: faker.image.food(),
    };
    productos.push(randomProduct);
  }

  try {
    res.status(200).render("pages/productos.ejs", { productos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
