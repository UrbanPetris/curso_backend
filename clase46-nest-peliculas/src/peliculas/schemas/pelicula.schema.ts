import * as mongoose from 'mongoose';

export const PeliculaSchema = new mongoose.Schema({
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
