const allMUtations = `

type Mutation {
    addProduct(data: ProductoInput): Producto
    updateProductById(id: ID!, data: ProductoInput): Producto
    deleteProductById(id: ID!): Producto
    deleteProducts: [Producto]
  }`;

module.exports = allMUtations;
