import { HydratedDocument, Types } from 'mongoose';
export type LocationDocument = HydratedDocument<Location>;
export declare class Location {
    name?: string;
    x?: number;
    y?: number;
}
export declare const LocationSchema: import("mongoose").Schema<Location, import("mongoose").Model<Location, any, any, any, import("mongoose").Document<unknown, any, Location> & Location & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Location, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Location>> & import("mongoose").FlatRecord<Location> & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}>;
