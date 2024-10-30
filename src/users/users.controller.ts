import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Userz } from './schema/users.schema';
import { UsersService } from './users.service';
import { CreateUserDTO, PatchUserDTO } from './dto/user';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async find(@Query() query: unknown) {
    return await this.userService._find(query);
  }

  @Get(':id')
  async get(@Query() query:unknown, @Param('id') id: string) {
    return await this.userService._get(id, query);
  }

  @Post()
  async create(@Body() createUsersDto: CreateUserDTO) {
    return await this.userService._create(createUsersDto);
  }

  @Patch('/:id?')
  async patch(
    @Query() query,
    @Body() patchUsersDto: PatchUserDTO,
    @Param('id') id,
  ) {
    console.log(id);
    return await this.userService._patch(id, patchUsersDto, query);
  }

  @Delete('/:id?')
  async delete(@Param('id') id, @Query() query) {
    return await this.userService._remove(id, query);
  }
}
