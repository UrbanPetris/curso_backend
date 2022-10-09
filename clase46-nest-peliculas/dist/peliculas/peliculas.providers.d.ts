import { Connection } from 'mongoose';
export declare const peliculasProviders: {
    provide: string;
    useFactory: (connection: Connection) => import("mongoose").Model<{
        name: string;
        year: Date;
        genre?: string;
    }, {}, {}, {}, import("mongoose").Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
        name: string;
        year: Date;
        genre?: string;
    }>>;
    inject: string[];
}[];
