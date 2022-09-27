const axios = require("axios");

axios.defaults.baseURL = "http://127.0.0.1:8081/productos";

const pera = {
  name: "Pera",
  description:
    "La pera es una fruta jugosa y refrescante, dulce y sabrosa. Es muy adecuada para lograr un enriquecimiento vitamínico y favorecer una dieta sana y equilibrada. Su consumo es aconsejable para todas las etapas de la vida por sus propiedades, vitaminas, calcio y nutrientes.",
  code: "B89",
  photourl:
    "https://perfumesyfragancias.online/wp-content/uploads/2018/10/poire.jpg",
  price: 300,
  stock: 100,
};

const banana = {
  name: "Banana",
  description:
    "La banana aporta vitaminas A, C, B1, B2, B6, B9 -ácido fólico- y E. También minerales como el potasio, magnesio, hierro, selenio, zinc y calcio.",
  code: "A10",
  photourl:
    "https://static9.depositphotos.com/1642482/1149/i/950/depositphotos_11490585-stock-photo-bananas.jpg",
  price: 60,
  stock: 200,
};

const update = {
  price: 900,
  stock: 20,
};

const addProduct = async (payload) => {
  const url = "/";

  try {
    const response = await axios.post(url, payload);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const deleteProducts = async () => {
  const url = `/`;
  try {
    const response = await axios.delete(url);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const getProducts = async () => {
  const url = "/";
  try {
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const getProductById = async (id) => {
  const url = `/${id}`;
  try {
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const updateProductById = async (id, payload) => {
  const url = `/${id}`;
  try {
    const response = await axios.put(url, payload);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const deleteProductById = async (id) => {
  const url = `/${id}`;
  try {
    const response = await axios.delete(url);
    return response;
  } catch (err) {
    console.log(err);
  }
};

(async () => {
  // ** Agregar productos (addProduct) **

  productAdded = await addProduct(banana);
  if (productAdded.status == "201") {
    console.log("Producto agregado: status 201");
  }
  const { name, description, code, photourl, price, stock } = {
    ...productAdded.data,
  };
  if (
    name === banana.name &&
    description == banana.description &&
    code == banana.code &&
    photourl == banana.photourl &&
    price == banana.price &&
    stock == banana.stock
  ) {
    console.log(
      `Producto con id ${productAdded.data._id} guardado con valores idénticos`
    );
  }

  // ** Encontrar producto por id (getProductById) **

  console.log("--------------------------");
  productById = await getProductById(productAdded.data._id);
  if (productById.status == "200") {
    console.log("Producto encontrado: status 200");
  }

  // ** Encontrar productos (getProducts) **

  console.log("--------------------------");
  productAdded2 = await addProduct(pera);
  products = await getProducts();
  if (products.status == "200") {
    console.log("Productos encontrados: status 200");
  }

  const comparativa = products.data.filter((payloadProduct) =>
    [banana, pera].find(
      (retrievedProduct) =>
        payloadProduct.name == retrievedProduct.name &&
        payloadProduct.description == retrievedProduct.description &&
        payloadProduct.code == retrievedProduct.code &&
        payloadProduct.photourl == retrievedProduct.photourl &&
        payloadProduct.stock == retrievedProduct.stock &&
        payloadProduct.price == retrievedProduct.price
    )
  );

  if (comparativa.length === 2) {
    console.log(
      `${products.data.length} productos encontrados con idénticas propiedades a las subidas`
    );
  }

  // ** Actualizar producto por id (updateProductById) **

  console.log("--------------------------");

  productUpdatedById = await updateProductById(productAdded.data._id, update);
  if (productUpdatedById.status == "200") {
    console.log("Producto actualizado: status 200");
  }
  productById = await getProductById(productAdded.data._id);
  if (
    productById.data.price == update.price &&
    productById.data.stock == update.stock
  ) {
    console.log(
      `${productUpdatedById.data.modifiedCount} producto/s actualizado/s`,
      "\n",
      `Producto con id ${productById.data._id} con precio actualizado con valor ${productById.data.price} y stock actualizado con valor ${productById.data.stock}`
    );
  }

  // ** Borar un producto por id (deleteProductById) **

  console.log("--------------------------");
  productDeleted = await deleteProductById(productAdded.data._id);
  if (productDeleted.status == "200") {
    console.log("Producto borrado: status 200");
  }
  if (productDeleted.data.deletedCount == 1) {
    console.log(`Producto con id ${productAdded.data._id} borrado`);
  }

  // ** Borar todos los productos (deleteProducts) **

  console.log("--------------------------");
  deletedProducts = await deleteProducts();
  if (deletedProducts.status == "200") {
    console.log("Productos borrados: status 200");
  }
  const deletedProductsCount = deletedProducts.data.deletedCount;
  if (deletedProductsCount > 0) {
    console.log(`${deletedProductsCount} producto/s borrado/s`);
  }
})();
