import { HydratedDocument, Types } from 'mongoose';
export type UsersDocument = HydratedDocument<Users>;
export declare class Users {
    email: string;
    name?: string;
    organization?: Types.ObjectId;
    location: Types.ObjectId;
}
export declare const UsersSchema: import("mongoose").Schema<Users, import("mongoose").Model<Users, any, any, any, import("mongoose").Document<unknown, any, Users> & Users & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Users, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Users>> & import("mongoose").FlatRecord<Users> & {
    _id: Types.ObjectId;
} & {
    __v?: number;
}>;
