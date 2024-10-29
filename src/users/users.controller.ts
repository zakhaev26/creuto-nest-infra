import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async find(@Query() query) {
    return await this.userService._find(query);
  }

  @Get(':id')
  async get(@Query() query, @Param('id') id: string) {
    console.log(id);
    return await this.userService._get(id, query);
  }

  @Post()
  async create(@Body() createUsersDto) {
    return await this.userService._create(createUsersDto);
  }
}
