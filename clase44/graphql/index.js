const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const allTypes = require("./types/productos/productos");
const allQueries = require("./queries/allQueries");
const allMutation = require("./mutations/allMutations");
const resolvers = require("./resolvers/productos/index");

// const {
//   getProducts,
//   addProduct,
//   getProductById,
//   updateProductById,
//   deleteProductById,
//   deleteProducts,
// } = require("../controllers/productosAPI");

const schema = buildSchema(`${allQueries} ${allMutation} ${allTypes}`);

// const schema = buildSchema(`
//   type Producto  {
//     id: ID!
//     name: String,
//     description: String,
//     code: String,
//     photourl: String,
//     price: Float,
//     stock: Int
//   }

//   input ProductoInput {
//     name: String,
//     description: String,
//     code: String,
//     photourl: String,
//     price: Float,
//     stock: Int
//   }

//   type Query {
//     getProductById(id: ID!): Producto
//     getProducts: [Producto]
//   }

//   type Mutation {
//     addProduct(data: ProductoInput): Producto
//     updateProductById(id: ID!, data: ProductoInput): Producto
//     deleteProductById(id: ID!): Producto
//     deleteProducts: [Producto]
//   }

// `);

const express_graphiql = graphqlHTTP({
  schema: schema,
  rootValue: {
    // getProductById,
    // getProducts,
    // addProduct,
    // updateProductById,
    // deleteProductById,
    // deleteProducts,
    ...resolvers,
  },
  graphiql: true,
});

module.exports = express_graphiql;
