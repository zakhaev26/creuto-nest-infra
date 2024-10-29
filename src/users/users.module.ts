import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Userz, UsersSchema } from './schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Userz.name, schema: UsersSchema },
  ])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
