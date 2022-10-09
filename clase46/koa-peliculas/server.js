const Koa = require("koa");
const koaBody = require("koa-body");
let peliculas = require("./routes/peliculas");
const mongoose = require("mongoose");
const app = new Koa();

app.use(koaBody());

app.use(peliculas.routes());

app.use(async (ctx) => {
  ctx.body = "Bienvenido a la API de peliculas. Diríjase a la ruta /peliculas";
});

app.listen(3000, async () => {
  await mongoose.connect(
    "mongodb+srv://Petris:coderhouse@cluster0.j2rcm.mongodb.net/?retryWrites=true&w=majority"
  );
});
