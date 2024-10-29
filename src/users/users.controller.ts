import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Userz } from './schema/users.schema';
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

  @Patch('/:id')
  async patchOne(
    @Query() query,
    @Body() patchUsersDto: Partial<Userz>,
    @Param('id') id,
  ) {
    return await this.userService._patch(id, patchUsersDto, query);
  }

  @Patch()
  async patchMany(@Query() query, @Body() patchUsersDto: Partial<Userz>) {
    return await this.userService._patch(null, patchUsersDto, query);
  }

  @Get(':id')
  async get(@Query() query, @Param('id') id: string) {
    console.log(id);
    return await this.userService._get(id, query);
  }
}
