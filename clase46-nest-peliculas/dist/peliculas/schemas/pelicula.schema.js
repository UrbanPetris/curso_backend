"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeliculaSchema = void 0;
const mongoose = require("mongoose");
exports.PeliculaSchema = new mongoose.Schema({
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
//# sourceMappingURL=pelicula.schema.js.map