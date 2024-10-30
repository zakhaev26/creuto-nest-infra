import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Userz, UsersSchema } from './schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Userz.name, schema: UsersSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'OPTIONS',
      useFactory: () => ({
        deleteKey: 'deleted',
        defaultPagination: true,
        defaultLimit: 20,
        defaultSkip: 0,
        multi: false,
      }),
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}