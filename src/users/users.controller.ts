import {
    Body,
    Controller,
    Get,
    Post,
    Query,
  } from '@nestjs/common';
import { UsersService } from './users.service';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly userService: UsersService) {}
  
    @Get()
    async find(@Query() query) {
      return await this.userService._find(query);
    }
  
    @Post()
    async create(@Body() createOrgDto) {
      return await this.userService._create(createOrgDto);
    }
  }
  