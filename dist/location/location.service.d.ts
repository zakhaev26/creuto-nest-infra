import { Location } from './schema/location.schema';
import { Model } from 'mongoose';
export declare class LocationService {
    private readonly locationModel;
    constructor(locationModel: Model<Location>);
    _find(params?: {}): Promise<void>;
    _create(data: any): Promise<import("mongoose").Document<unknown, {}, Location> & Location & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
}
