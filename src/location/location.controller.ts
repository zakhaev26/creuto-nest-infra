import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationDTO, LocationSchema } from './dto/location.dto';

@Controller('location')
export class LocationController {

    constructor(
        private readonly locationService:LocationService
    ){}

    @Get()
    async find(@Query() q) {
        console.log(q);
        return {};
    }
    
    @Post()
    async create(@Body() body: any) {
        const result = LocationSchema.safeParse(body);

        if(!result.success) {
            throw new BadRequestException(result.error.errors);
        }

        const userData: LocationDTO = result.data;
        return await this.locationService._create(userData);
    }
}
