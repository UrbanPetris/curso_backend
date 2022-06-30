const { options } = require("../config/mysql");
const knex = require("knex")(options);

const checkTable = async () => {
  return await knex.schema.hasTable("chat");
};

const selectFromChat = async () => {
  return await knex("chat").select("email", "text", "time");
};

const getHistoricalChat = async () => {
  const chatExists = await knex.schema.hasTable("chat");
  if (chatExists) {
    let chat = selectFromChat();
    return chat;
  }
};

const updateChat = async (message) => {
  const chatExists = await checkTable();
  if (!chatExists) {
    await knex.schema.createTable("chat", (table) => {
      table.increments("id", { primaryKey: true });
      table.string("email").notNullable();
      table.string("text");
      table.string("time").notNullable();
    });
  }
  //actualizo
  await knex("chat").insert(message);
  //selecciono y envío
  let chat = selectFromChat();
  return chat;
};

module.exports = {
  getHistoricalChat,
  updateChat,
};
