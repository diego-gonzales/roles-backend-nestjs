import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RolesModule // lo importo para usar el RolesService
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
