const Router = require("koa-router");
const {
  findAll,
  create,
  findById,
  update,
  remove,
} = require("../controllers/peliculas");

const router = new Router({
  prefix: "/peliculas",
});

router
  .get("/", findAll)
  .post("/", create)
  .get("/:id", findById)
  .patch("/:id", update)
  .delete("/:id", remove);

module.exports = router;
