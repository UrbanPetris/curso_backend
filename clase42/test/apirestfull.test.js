const request = require("supertest")("http://localhost:8081");

const { expect } = require("chai");
const chai = require("chai");
const chaiExclude = require("chai-exclude");

chai.use(chaiExclude);

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

const update = {
  price: 900,
  stock: 20,
};

let responseADD_PRODUCT;
let responseGET_PRODUCT_BY_ID;
let responseGET_PRODUCTS;
let responseUPDATE_PRODUCT_BY_ID;
let responseDELETE_PRODUCT_BY_ID;
let responseDELETE_PRODUCTS;

describe("test api rest full", () => {
  describe("ADD PRODUCT", () => {
    it("Retorna status 201", async () => {
      responseADD_PRODUCT = await request.post("/productos").send(banana);
      expect(responseADD_PRODUCT.status).to.eql(201);
    });
    it("Producto es agregado con valores idénticos", async () => {
      expect(responseADD_PRODUCT.body).to.include(banana);
    });
  });
  describe("GET ADDED PRODUCT BY ID", () => {
    it("Retorna status 200", async () => {
      const id = JSON.parse(responseADD_PRODUCT.text)._id;
      responseGET_PRODUCT_BY_ID = await request.get(`/productos/${id}`);
      expect(responseGET_PRODUCT_BY_ID.status).to.eql(200);
    });
  });
  describe("GET ALL PRODUCTS", () => {
    it("Retorna status 200", async () => {
      await request.post("/productos").send(pera);
      responseGET_PRODUCTS = await request.get("/productos");
      expect(responseGET_PRODUCTS.status).to.eql(200);
    });
    it("Productos encontrados con valores idénticos", async () => {
      let productos = JSON.parse(responseGET_PRODUCTS.text);
      expect(productos)
        .excluding(["__v", "_id"]) // Remuevo meta campos de Mongo
        .to.have.length(2)
        .and.to.deep.equal([banana, pera]);
    });
  });
  describe("UPDATE PRODUCT BY ID", () => {
    it("Retorna status 200", async () => {
      const id = JSON.parse(responseADD_PRODUCT.text)._id;
      responseUPDATE_PRODUCT_BY_ID = await request
        .put(`/productos/${id}`)
        .send(update);
      expect(responseUPDATE_PRODUCT_BY_ID.status).to.eql(200);
    });
    it("1 producto actualizado con los valores enviados", async () => {
      const id = JSON.parse(responseADD_PRODUCT.text)._id;
      const producto = await request.get(`/productos/${id}`);
      modifiedCount = JSON.parse(
        responseUPDATE_PRODUCT_BY_ID.text
      ).modifiedCount;
      expect(modifiedCount).to.equal(1) &&
        expect(JSON.parse(producto.text)).to.include(update);
    });
  });
  describe("DELETE PRODUCT BY ID", () => {
    it("Retorna status 200", async () => {
      const id = JSON.parse(responseADD_PRODUCT.text)._id;
      responseDELETE_PRODUCT_BY_ID = await request.delete(`/productos/${id}`);
      expect(responseDELETE_PRODUCT_BY_ID.status).to.eql(200);
    });
    it("1 producto borrado", async () => {
      deletedCount = JSON.parse(responseDELETE_PRODUCT_BY_ID.text).deletedCount;
      expect(deletedCount).to.equal(1);
    });
  });
  describe("DELETE ALL PRODUCTS", () => {
    it("Retorna status 200", async () => {
      responseDELETE_PRODUCTS = await request.delete(`/productos/`);
      expect(responseDELETE_PRODUCTS.status).to.eql(200);
    });
    it("Productos borrados", async () => {
      deletedCount = JSON.parse(responseDELETE_PRODUCTS.text).deletedCount;
      expect(deletedCount).to.be.above(0);
    });
  });
});
