import { Connection } from 'mongoose';
import { PeliculaSchema } from './schemas/pelicula.schema';

export const peliculasProviders = [
  {
    provide: 'PELICULA_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Pelicula', PeliculaSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
