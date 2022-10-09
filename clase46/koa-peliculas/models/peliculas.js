const peliculaCollection = "peliculas2";

const mongoose = require("mongoose");

const peliculaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  genre: String,
});

const Pelicula = mongoose.model(peliculaCollection, peliculaSchema);

module.exports = {
  Pelicula,
};
