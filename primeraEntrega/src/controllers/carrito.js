const { findProduct } = require("../controllers/productos");
const fs = require("fs");

let carritos = [];

const guardarCarrito = async (object) => {
  await fs.promises.writeFile(
    "./utils/carrito.txt",
    JSON.stringify(object, null, 2),
    {
      encoding: "utf8",
      flag: "w",
    }
  );
};

const findCarrito = (id) => {
  return carritos.find((prod) => prod.id === parseInt(id));
};

const getCarritos = (req, res) => {
  try {
    res.status(200).json(carritos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addCarrito = (req, res) => {
  try {
    const id = carritos.length + 1;
    const timestamp = Date.now();
    let cartProducts = [];
    const nuevoCarrito = { id, timestamp, cartProducts };
    carritos.push(nuevoCarrito);
    try {
      guardarCarrito(carritos);
    } catch {
      res.status(500).json({ message: err.message });
    }

    res.status(201).json({ id: nuevoCarrito.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCarritoById = (req, res) => {
  try {
    const carrito = findCarrito(req.params.id);
    if (carrito) {
      carritos = carritos.filter((carr) => carr.id !== parseInt(carrito.id));
      try {
        guardarCarrito(carritos);
      } catch {
        res.status(500).json({ message: err.message });
      }
      res.status(200).json({ message: "Carrito eliminado" });
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addProductToCartById = (req, res) => {
  try {
    const carrito = findCarrito(req.params.id);
    if (carrito) {
      const producto = findProduct(req.body.id);

      if (producto) {
        carritos[
          carritos.findIndex((carr) => carr.id === carrito.id)
        ].cartProducts.push(producto);
        try {
          guardarCarrito(carritos);
        } catch {
          res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: "Producto agregado" });
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductsInCartById = (req, res) => {
  try {
    const carrito = findCarrito(req.params.id);
    if (carrito) {
      res.status(200).json({ cartProducts: carrito.cartProducts });
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProductInCartById = (req, res) => {
  try {
    const carrito = findCarrito(req.params.id);
    if (carrito) {
      const producto = findProduct(req.params.id_prod);

      if (producto) {
        const cartIndex = carritos.findIndex((carr) => carr.id === carrito.id);

        carritos = carritos.map((carr) => {
          if (carr.id === carrito.id) {
            const updatedCartProducts = carritos[cartIndex].cartProducts.filter(
              (prod) => prod.id !== parseInt(producto.id)
            );
            let { cartProducts, ...updatedCarr } = carr;

            updatedCarr = { ...updatedCarr, cartProducts: updatedCartProducts };
            return updatedCarr;
          } else {
            return carr;
          }
        });
        try {
          guardarCarrito(carritos);
        } catch {
          res.status(500).json({ message: err.message });
        }
        res.status(200).json({ message: "Producto eliminado" });
      } else {
        res.status(404).json({ error: "Producto no encontrado" });
      }
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  carritos,
  getCarritos,
  addCarrito,
  deleteCarritoById,
  addProductToCartById,
  getProductsInCartById,
  deleteProductInCartById,
};
