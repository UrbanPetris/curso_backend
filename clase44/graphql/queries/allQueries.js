const allQueries = `

type Query {
    getProductById(id: ID!): Producto
    getProducts: [Producto]
  }`;

module.exports = allQueries;
