const { Pelicula } = require("../models/peliculas");

const findAll = async (ctx) => {
  ctx.body = await Pelicula.find();
};

const create = async (ctx) => {
  try {
    const pelicula = await new Pelicula(ctx.request.body).save();
    ctx.body = pelicula;
  } catch (err) {
    ctx.throw(422);
  }
};

const findById = async (ctx) => {
  try {
    const pelicula = await Pelicula.findById(ctx.params.id);
    if (!pelicula) {
      ctx.throw(404);
    }
    ctx.body = pelicula;
  } catch (err) {
    if (err.name === "CastError" || err.name === "NotFoundError") {
      ctx.throw(404);
    }
    ctx.throw(500);
  }
};

const update = async (ctx) => {
  try {
    const pelicula = await Pelicula.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    if (!pelicula) {
      ctx.throw(404);
    }
    ctx.body = pelicula;
  } catch (err) {
    if (err.name === "CastError" || err.name === "NotFoundError") {
      ctx.throw(404);
    }
    ctx.throw(500);
  }
};

const remove = async (ctx) => {
  try {
    const pelicula = await Pelicula.findByIdAndRemove(ctx.params.id);
    if (!pelicula) {
      ctx.throw(404);
    }
    ctx.body = pelicula;
  } catch (err) {
    if (err.name === "CastError" || err.name === "NotFoundError") {
      ctx.throw(404);
    }
    ctx.throw(500);
  }
};

module.exports = {
  findAll,
  create,
  findById,
  update,
  remove,
};
