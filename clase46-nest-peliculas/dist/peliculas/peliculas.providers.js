"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.peliculasProviders = void 0;
const pelicula_schema_1 = require("./schemas/pelicula.schema");
exports.peliculasProviders = [
    {
        provide: 'PELICULA_MODEL',
        useFactory: (connection) => connection.model('Pelicula', pelicula_schema_1.PeliculaSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=peliculas.providers.js.map