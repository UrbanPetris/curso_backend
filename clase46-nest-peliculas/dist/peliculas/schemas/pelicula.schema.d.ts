import * as mongoose from 'mongoose';
export declare const PeliculaSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    name: string;
    year: Date;
    genre?: string;
}>;
