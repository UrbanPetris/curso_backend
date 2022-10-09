import { Model } from 'mongoose';
import { Pelicula } from './interfaces/pelicula.interface';
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CreatePeliculaDto } from './dto/create-pelicula.dto';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto';

@Injectable()
export class PeliculasService {
  constructor(
    @Inject('PELICULA_MODEL')
    private peliculaModel: Model<Pelicula>,
  ) {}

  async create(createPeliculaDto: CreatePeliculaDto): Promise<Pelicula> {
    const createdPelicula = new this.peliculaModel(createPeliculaDto);
    return await createdPelicula.save();
  }

  async findAll(): Promise<Pelicula[]> {
    return await this.peliculaModel.find().exec();
  }

  async findOne(id: string) {
    return await this.peliculaModel.findById(id).exec();
  }

  async update(id: string, updatePeliculaDto: UpdatePeliculaDto) {
    const updatedPelicula = await this.peliculaModel.findByIdAndUpdate(
      id,
      updatePeliculaDto,
    );
    // .setOptions({ overwrite: true, new: true });
    if (!updatedPelicula) {
      throw new NotFoundException();
    }
    return updatedPelicula;
  }

  async remove(id: string) {
    const deletedPelicula = await this.peliculaModel.findByIdAndDelete(id);

    if (!deletedPelicula) {
      throw new NotFoundException();
    }
    return deletedPelicula;
  }
}
