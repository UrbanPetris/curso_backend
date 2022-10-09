import { Model } from 'mongoose';
import { Pelicula } from './interfaces/pelicula.interface';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';
export declare class PeliculasService {
    private peliculaModel;
    constructor(peliculaModel: Model<Pelicula>);
    create(createPeliculaDto: CreatePeliculaDto): Promise<Pelicula>;
    findAll(): Promise<Pelicula[]>;
    findOne(id: string): Promise<Pelicula & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updatePeliculaDto: UpdatePeliculaDto): Promise<Pelicula & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<Pelicula & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
