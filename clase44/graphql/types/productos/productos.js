const productData = `type Producto  {
    id: ID!
    name: String,
    description: String,
    code: String,
    photourl: String,
    price: Float,
    stock: Int
  }`;

const productInputData = ` input ProductoInput {
    name: String,
    description: String,
    code: String,
    photourl: String,
    price: Float,
    stock: Int
  }`;

module.exports = `${productData} ${productInputData}`;
