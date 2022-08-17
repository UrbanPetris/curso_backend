const mongoose = require("mongoose");
const usuariosCollection = "usuarios";

const usuariosSchema = new mongoose.Schema({
  // username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  // firstname: { type: String, required: true },
  // lastname: { type: String, required: true },
});

const Users = new mongoose.model(usuariosCollection, usuariosSchema);

module.exports = {
  Users,
};
