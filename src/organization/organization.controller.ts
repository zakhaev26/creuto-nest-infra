import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  async find(@Query() query) {
    return await this.organizationService._find(query);
  }

  @Post()
  async create(@Body() createOrgDto) {
    return await this.organizationService._create(createOrgDto);
  }
}
