import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationCreateDTO, LocationCreateSchema } from './dto/location.dto';
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async find(@Query() query) {
    return await this.locationService._find(query);
  }

  @Post()
  async create(@Body() body: any) {
    const result = LocationCreateSchema.safeParse(body);

    if (!result.success) {
      throw new BadRequestException(result.error.errors);
    }

    const userData: LocationCreateDTO = result.data;
    return await this.locationService._create(userData);
  }
}
