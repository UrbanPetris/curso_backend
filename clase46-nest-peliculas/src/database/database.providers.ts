import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb+srv://Petris:coderhouse@cluster0.j2rcm.mongodb.net/?retryWrites=true&w=majority',
      ),
  },
];
