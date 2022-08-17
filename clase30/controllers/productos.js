let productos = [];

const getProducts = (req, res) => {
  try {
    res.status(200).render("pages/productos.ejs", { productos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProduct = (req, res) => {
  try {
    productos.push({ ...req.body });
    res.status(201).render("pages/index.ejs");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts, addProduct };
