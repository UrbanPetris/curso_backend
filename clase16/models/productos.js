const { options } = require("../config/mysql");
const knex = require("knex")(options);

const checkTable = async () => {
  return await knex.schema.hasTable("productos");
};

const selectFromProductos = async () => {
  return await knex("productos").select("name", "price", "url");
};

const getProductsAvailable = async () => {
  const productosExists = await checkTable();
  if (productosExists) {
    let productos = selectFromProductos();
    return productos;
  }
};

const updateProducts = async (product) => {
  const productosExists = await checkTable();
  if (!productosExists) {
    await knex.schema.createTable("productos", (table) => {
      table.increments("id", { primaryKey: true });
      table.string("name").notNullable();
      table.float("price").notNullable();
      table.string("url");
    });
  }
  //actualizo
  await knex("productos").insert(product);
  //selecciono y envío
  let productos = selectFromProductos();
  return productos;
};

module.exports = {
  getProductsAvailable,
  updateProducts,
};
