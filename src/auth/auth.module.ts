import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema/user.schema';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120s' }
    })
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // esto hace a nuestro guard global y ponemos public solo las rutas deseadas con un custom decorator
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ],
  exports: [
    AuthService,
    JwtModule
  ],
  controllers: [AuthController]
})
export class AuthModule { }
