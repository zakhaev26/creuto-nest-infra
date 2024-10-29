import { LocationService } from './location.service';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    find(q: any): Promise<{}>;
    create(body: any): Promise<import("mongoose").Document<unknown, {}, import("./schema/location.schema").Location> & import("./schema/location.schema").Location & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v?: number;
    }>;
}
