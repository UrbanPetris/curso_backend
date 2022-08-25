let productos = [];
const { log, logerror } = require("../logger");

const getProducts = (req, res) => {
  try {
    log.info(`${req.method} en ${req.originalUrl}`);
    res.status(200).render("pages/productos.ejs", { productos });
  } catch (err) {
    log.error(`Error obteniendo productos ${err}`);
    logerror.error(`Error obteniendo productos ${err}`);
    res.status(500).json({ message: err.message });
  }
};

const addProduct = (req, res) => {
  try {
    productos.push({ ...req.body });
    res.status(201).render("pages/index.ejs");
    log.info(`${req.method} en ${req.originalUrl}`);
  } catch (err) {
    log.error(`Error agregando productos ${err}`);
    logerror.error(`Error agregando productos ${err}`);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts, addProduct };
