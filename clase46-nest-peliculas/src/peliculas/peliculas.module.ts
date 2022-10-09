import { Module } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { PeliculasController } from './peliculas.controller';
import { peliculasProviders } from './peliculas.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PeliculasController],
  providers: [PeliculasService, ...peliculasProviders],
})
export class PeliculasModule {}
