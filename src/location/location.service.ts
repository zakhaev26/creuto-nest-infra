import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/users/schema/users.schema';
import { Location } from './schema/location.schema';
import { Model } from 'mongoose';

@Injectable()
export class LocationService {
    constructor(
        @InjectModel(Location.name) private readonly locationModel: Model<Location>,
    ){}
    async _find(params = {}) {
        
    }   

    async _create(data) {
        console.log(data);
        return await this.locationModel.create(data);
    }
}
