import { Document } from 'mongoose';
export interface Pelicula extends Document {
    readonly name: string;
    readonly year: Date;
    readonly genre: string;
}
