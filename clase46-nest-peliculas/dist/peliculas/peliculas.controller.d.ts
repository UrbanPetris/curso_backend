import { PeliculasService } from './peliculas.service';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';
export declare class PeliculasController {
    private readonly peliculasService;
    constructor(peliculasService: PeliculasService);
    create(createPeliculaDto: CreatePeliculaDto): Promise<import("./interfaces/pelicula.interface").Pelicula>;
    findAll(): Promise<import("./interfaces/pelicula.interface").Pelicula[]>;
    findOne(id: string): Promise<import("./interfaces/pelicula.interface").Pelicula & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updatePeliculaDto: UpdatePeliculaDto): Promise<import("./interfaces/pelicula.interface").Pelicula & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    remove(id: string): Promise<import("./interfaces/pelicula.interface").Pelicula & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
